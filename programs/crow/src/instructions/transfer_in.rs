use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{
        mpl_token_metadata::{instructions::TransferV1CpiBuilder, types::TokenStandard},
        MasterEditionAccount, Metadata, MetadataAccount, TokenRecordAccount,
    },
    token::{close_account, transfer, CloseAccount, Mint, Token, TokenAccount, Transfer},
};

use crate::{
    constants::{FEES_WALLET, FEE_WAIVER},
    state::{Asset, AssetType, Crow, ProgramConfig, Vesting},
    CrowError, TransferInEvent,
};

#[derive(Accounts)]
pub struct TransferIn<'info> {
    #[account(
        seeds = [b"program-config"],
        bump = program_config.bump
    )]
    pub program_config: Box<Account<'info, ProgramConfig>>,

    #[account(
        init_if_needed,
        payer = authority,
        space = Crow::LEN,
        seeds = [
            b"CROW",
            nft_mint.key().as_ref()
        ],
        bump,
    )]
    pub crow: Box<Account<'info, Crow>>,

    #[account(
        mint::decimals = 0,
        constraint = nft_mint.supply == 1 @ CrowError::TokenNotNft
    )]
    pub nft_mint: Box<Account<'info, Mint>>,

    #[account(
        seeds = [
            b"metadata",
            Metadata::id().as_ref(),
            nft_mint.key().as_ref()
        ],
        seeds::program = Metadata::id(),
        bump,
    )]
    pub nft_metadata: Box<Account<'info, MetadataAccount>>,

    #[account(
        init,
        space = Asset::LEN,
        payer = authority
    )]
    pub asset: Box<Account<'info, Asset>>,

    pub token_mint: Option<Box<Account<'info, Mint>>>,

    #[account(mut)]
    pub escrow_nft_metadata: Option<Box<Account<'info, MetadataAccount>>>,
    pub escrow_nft_edition: Option<Box<Account<'info, MasterEditionAccount>>>,

    #[account(
        mut,
        associated_token::mint = token_mint,
        associated_token::authority = authority
    )]
    pub token_account: Option<Box<Account<'info, TokenAccount>>>,

    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = token_mint,
        associated_token::authority = crow
    )]
    pub destination_token: Option<Box<Account<'info, TokenAccount>>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        address = FEES_WALLET
    )]
    pub fees_wallet: SystemAccount<'info>,

    #[account(
        address = FEE_WAIVER
    )]
    pub fee_waiver: Option<Signer<'info>>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub metadata_program: Program<'info, Metadata>,

    #[account(mut)]
    pub owner_token_record: Option<Box<Account<'info, TokenRecordAccount>>>,

    /// CHECK: this account is initialized in the CPI call
    #[account(mut)]
    pub destination_token_record: Option<AccountInfo<'info>>,

    /// CHECK: account checked in CPI
    pub sysvar_instructions: AccountInfo<'info>,
    /// CHECK: account checked in CPI
    pub auth_rules: Option<AccountInfo<'info>>,
    /// CHECK: account checked in CPI
    pub auth_rules_program: Option<AccountInfo<'info>>,
}

impl<'info> TransferIn<'info> {
    pub fn transfer_token_ctx(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: self
                .token_account
                .as_ref()
                .expect("token_account expected")
                .to_account_info(),
            to: self
                .destination_token
                .as_ref()
                .expect("reward_receive_account expected")
                .to_account_info(),
            authority: self.authority.as_ref().to_account_info(),
        };

        let cpi_program = self.token_program.to_account_info();

        CpiContext::new(cpi_program, cpi_accounts)
    }

    pub fn transfer_nft(&self) -> Result<()> {
        let metadata_program = &self.metadata_program;
        let token = &self.token_account.as_ref().unwrap().to_account_info();
        let token_owner = &self.authority.to_account_info();
        let destination_token = self.destination_token.as_ref().unwrap().to_account_info();
        let destination_owner = &self.crow.to_account_info();
        let mint = &self.token_mint.as_ref().unwrap().to_account_info();
        let metadata = &self.escrow_nft_metadata.as_ref().unwrap().to_account_info();
        let edition = &self.escrow_nft_edition.as_ref().unwrap().to_account_info();
        let system_program = &self.system_program.to_account_info();
        let sysvar_instructions = &self.sysvar_instructions.to_account_info();
        let spl_token_program = &&self.token_program.to_account_info();
        let spl_ata_program = &self.associated_token_program.to_account_info();
        let auth_rules_program = self.auth_rules_program.as_ref();
        let auth_rules = self.auth_rules.as_ref();
        let token_record = &self
            .owner_token_record
            .as_ref()
            .map(|token_record| token_record.to_account_info());
        let destination_token_record = self.destination_token_record.as_ref();

        let mut cpi_transfer = TransferV1CpiBuilder::new(&metadata_program);

        cpi_transfer
            .token(token)
            .token_owner(token_owner)
            .destination_token(&destination_token)
            .destination_owner(destination_owner)
            .mint(mint)
            .metadata(metadata)
            .edition(Some(edition))
            .authority(token_owner)
            .payer(token_owner)
            .system_program(system_program)
            .sysvar_instructions(sysvar_instructions)
            .spl_token_program(spl_token_program)
            .spl_ata_program(spl_ata_program)
            .authorization_rules_program(auth_rules_program)
            .authorization_rules(auth_rules)
            .token_record(token_record.as_ref())
            .destination_token_record(destination_token_record)
            .amount(1);

        // performs the CPI
        cpi_transfer.invoke()?;
        Ok(())
    }

    pub fn close_account_ctx(&self) -> CpiContext<'_, '_, '_, 'info, CloseAccount<'info>> {
        let cpi_accounts = CloseAccount {
            account: self.token_account.as_ref().unwrap().to_account_info(),
            destination: self.authority.to_account_info(),
            authority: self.authority.to_account_info(),
        };
        let cpi_program = self.token_program.to_account_info();
        CpiContext::new(cpi_program, cpi_accounts)
    }
}

pub fn transfer_in_handler(
    ctx: Context<TransferIn>,
    asset_type: AssetType,
    amount: Option<u64>,
    start_time: Option<i64>,
    end_time: Option<i64>,
    vesting: Vesting,
    fee: Option<u64>,
) -> Result<()> {
    let current_time = Clock::get().unwrap().unix_timestamp;
    let crow = &ctx.accounts.crow;
    let start_time = start_time.unwrap_or(current_time);
    let maybe_token_mint = &ctx.accounts.token_mint;
    let fees_wallet = &ctx.accounts.fees_wallet;

    let fees_waived = ctx.accounts.fee_waiver.is_some();

    if fees_waived {
        let fee = fee.unwrap_or(0);
        if fee > 0 {
            let ix = anchor_lang::solana_program::system_instruction::transfer(
                &ctx.accounts.authority.key(),
                &fees_wallet.key(),
                fee,
            );

            anchor_lang::solana_program::program::invoke(
                &ix,
                &[
                    ctx.accounts.authority.to_account_info(),
                    fees_wallet.to_account_info(),
                ],
            )?;
        }
    } else {
        require!(fee.is_none(), CrowError::FeeWaiverNotProvided);

        let tx_fee = ctx.accounts.program_config.distribute_fee;

        if tx_fee > 0 {
            let ix = anchor_lang::solana_program::system_instruction::transfer(
                &ctx.accounts.authority.key(),
                &fees_wallet.key(),
                tx_fee,
            );

            anchor_lang::solana_program::program::invoke(
                &ix,
                &[
                    ctx.accounts.authority.to_account_info(),
                    fees_wallet.to_account_info(),
                ],
            )?;
        }
    }

    if asset_type == AssetType::Nft {
        require_keys_neq!(
            ctx.accounts
                .token_mint
                .as_ref()
                .expect("Expected token mint")
                .key(),
            ctx.accounts.crow.nft_mint,
            CrowError::NftCeption
        );
        match vesting {
            Vesting::None => {}
            _ => return err!(CrowError::InvalidVesting),
        }
    }

    match vesting {
        Vesting::Intervals { num_intervals } => {
            require!(end_time.is_some(), CrowError::EndTimeRequired);
            let end_time = end_time.unwrap();
            require_gt!(end_time, start_time, CrowError::InvalidEndTime);
            require_gt!(num_intervals, 1, CrowError::NotEnoughIntervals)
        }
        Vesting::Linear => {
            require!(end_time.is_some(), CrowError::EndTimeRequired);
            require_gt!(end_time.unwrap(), start_time, CrowError::InvalidEndTime);
        }
        Vesting::None => {}
    }

    match asset_type {
        AssetType::Sol => {
            require!(maybe_token_mint.is_none(), CrowError::TokenMintNotRequired);
            let to_transfer: u64 = amount
                .expect("Amount expected")
                .checked_sub(ctx.accounts.asset.get_lamports())
                .ok_or(CrowError::ProgramSubError)?;

            let ix = anchor_lang::solana_program::system_instruction::transfer(
                &ctx.accounts.authority.key(),
                &ctx.accounts.asset.key(),
                to_transfer,
            );

            anchor_lang::solana_program::program::invoke(
                &ix,
                &[
                    ctx.accounts.authority.to_account_info(),
                    ctx.accounts.asset.to_account_info(),
                ],
            )?;
        }
        AssetType::Token => {
            require!(maybe_token_mint.is_some(), CrowError::TokenMintRequired);
            transfer(
                ctx.accounts.transfer_token_ctx(),
                amount.expect("Amount expected for token asset"),
            )?;
        }
        AssetType::Nft => {
            require!(maybe_token_mint.is_some(), CrowError::TokenMintRequired);
            require!(amount.is_none(), CrowError::UnexpectedAmount);
            let token_mint = maybe_token_mint.as_ref().unwrap();
            require_eq!(token_mint.supply, 1, CrowError::TokenNotNft);
            require_eq!(token_mint.decimals, 0, CrowError::TokenNotNft);
            ctx.accounts.transfer_nft()?;
            close_account(ctx.accounts.close_account_ctx())?;
        }
        _ => {
            return err!(CrowError::AssetTypeNotSupported);
        }
    }

    let asset = &mut ctx.accounts.asset;

    ***asset = Asset::init(
        crow.key(),
        ctx.accounts.authority.key(),
        asset_type,
        maybe_token_mint.as_ref().map(|token_mint| token_mint.key()),
        amount.unwrap_or(1),
        start_time,
        end_time,
        vesting,
        fees_waived && fee.unwrap_or(0) == 0,
    );

    if crow.nft_mint == Pubkey::default() {
        if !matches!(
            ctx.accounts
                .nft_metadata
                .token_standard
                .as_ref()
                .unwrap_or(&TokenStandard::NonFungible),
            TokenStandard::NonFungible | TokenStandard::ProgrammableNonFungible
        ) {
            return err!(CrowError::TokenNotNft);
        }

        let crow = &mut ctx.accounts.crow;
        ***crow = Crow::init(ctx.accounts.nft_mint.key(), ctx.bumps.crow)
    }

    emit!(TransferInEvent {
        asset: ctx.accounts.asset.key()
    });
    Ok(())
}
