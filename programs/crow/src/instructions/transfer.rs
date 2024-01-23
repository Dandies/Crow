use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{
        mpl_token_metadata::{
            instructions::TransferV1CpiBuilder,
            types::{TokenStandard, TokenState},
        },
        MasterEditionAccount, Metadata, MetadataAccount, TokenRecordAccount,
    },
    token::{
        close_account, transfer, CloseAccount, Mint, Token, TokenAccount, Transfer as TransferToken,
    },
};

use crate::{
    constants::{FEES_WALLET, FEE_WAIVER},
    state::{Asset, AssetType, Crow, ProgramConfig},
    CrowError,
};

#[derive(Accounts)]
pub struct Transfer<'info> {
    #[account(
        seeds = [b"program-config"],
        bump = program_config.bump
    )]
    pub program_config: Box<Account<'info, ProgramConfig>>,

    #[account(
        seeds = [
            b"CROW",
            crow.nft_mint.as_ref(),
            crow.authority.as_ref(),
        ],
        bump = crow.bump,
        has_one = authority,
        has_one = nft_mint
    )]
    pub crow: Box<Account<'info, Crow>>,

    #[account(
        mut,
        has_one = crow
    )]
    pub asset: Box<Account<'info, Asset>>,

    #[account(mut)]
    pub authority: SystemAccount<'info>,

    #[account(mut)]
    pub recipient: SystemAccount<'info>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub nft_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        address = FEES_WALLET
    )]
    pub fees_wallet: SystemAccount<'info>,

    #[account(address = FEE_WAIVER)]
    pub fee_waiver: Option<Signer<'info>>,

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
        seeds = [
            b"metadata",
            Metadata::id().as_ref(),
            nft_mint.key().as_ref(),
            b"token_record",
            nft_token.key().as_ref(),
        ],
        seeds::program = Metadata::id(),
        bump,
    )]
    pub nft_token_record: Option<Box<Account<'info, TokenRecordAccount>>>,

    #[account(
        init_if_needed,
        payer = owner,
        associated_token::mint = nft_mint,
        associated_token::authority = owner,
        constraint = nft_token.amount == 1 @ CrowError::Unauthorized
    )]
    pub nft_token: Box<Account<'info, TokenAccount>>,

    pub token_mint: Option<Box<Account<'info, Mint>>>,

    #[account(
        mut,
        associated_token::mint = token_mint,
        associated_token::authority = crow
    )]
    pub token_account: Option<Box<Account<'info, TokenAccount>>>,

    #[account(
        init_if_needed,
        payer = owner,
        associated_token::mint = token_mint,
        associated_token::authority = recipient
    )]
    pub destination_token: Option<Box<Account<'info, TokenAccount>>>,

    #[account(mut)]
    pub escrow_nft_metadata: Option<Box<Account<'info, MetadataAccount>>>,
    pub escrow_nft_edition: Option<Box<Account<'info, MasterEditionAccount>>>,

    #[account(mut)]
    owner_token_record: Option<Box<Account<'info, TokenRecordAccount>>>,

    /// CHECK: this account is initialized in the CPI call
    #[account(mut)]
    destination_token_record: Option<AccountInfo<'info>>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub metadata_program: Program<'info, Metadata>,

    /// CHECK: account checked in CPI
    pub sysvar_instructions: AccountInfo<'info>,
    /// CHECK: account checked in CPI
    pub auth_rules: Option<AccountInfo<'info>>,
    /// CHECK: account checked in CPI
    pub auth_rules_program: Option<AccountInfo<'info>>,
}

impl<'info> Transfer<'info> {
    pub fn transfer_token_ctx(&self) -> CpiContext<'_, '_, '_, 'info, TransferToken<'info>> {
        let cpi_accounts = TransferToken {
            from: self
                .token_account
                .as_ref()
                .expect("token_account expected")
                .to_account_info(),
            to: self
                .destination_token
                .as_ref()
                .expect("destination_token expected")
                .to_account_info(),
            authority: self.crow.as_ref().to_account_info(),
        };

        let cpi_program = self.token_program.to_account_info();

        CpiContext::new(cpi_program, cpi_accounts)
    }

    pub fn transfer_nft(&self) -> Result<()> {
        let crow = &self.crow;
        let nft_mint_key = crow.nft_mint;
        let authority_key = crow.authority;
        let bump = crow.bump;
        let metadata_program = &self.metadata_program;
        let token = &self.token_account.as_ref().unwrap().to_account_info();
        let token_owner = &self.crow.to_account_info();
        let payer = &self.owner.to_account_info();
        let destination_token = &self.destination_token.as_ref().unwrap().to_account_info();
        let destination_owner = &self.recipient.to_account_info();
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
            .payer(payer)
            .system_program(system_program)
            .sysvar_instructions(sysvar_instructions)
            .spl_token_program(spl_token_program)
            .spl_ata_program(spl_ata_program)
            .authorization_rules_program(auth_rules_program)
            .authorization_rules(auth_rules)
            .token_record(token_record.as_ref())
            .destination_token_record(destination_token_record)
            .amount(1);

        let authority_seed = &[
            &b"CROW"[..],
            &nft_mint_key.as_ref(),
            &authority_key.as_ref(),
            &[bump],
        ];

        // performs the CPI
        cpi_transfer.invoke_signed(&[authority_seed])?;
        Ok(())
    }

    pub fn close_account_ctx(&self) -> CpiContext<'_, '_, '_, 'info, CloseAccount<'info>> {
        let cpi_accounts = CloseAccount {
            account: self.token_account.as_ref().unwrap().to_account_info(),
            destination: self.authority.to_account_info(),
            authority: self.crow.to_account_info(),
        };
        let cpi_program = self.token_program.to_account_info();
        CpiContext::new(cpi_program, cpi_accounts)
    }
}

pub fn transfer_handler(ctx: Context<Transfer>) -> Result<()> {
    let current_time = Clock::get().unwrap().unix_timestamp;
    let asset = &ctx.accounts.asset;
    let crow = &ctx.accounts.crow;
    let metadata = &ctx.accounts.nft_metadata;
    let nft_mint_key = crow.nft_mint;
    let authority_key = crow.authority;
    let bump = crow.bump;

    if !asset.fees_waived && ctx.accounts.fee_waiver.is_none() {
        let tx_fee = ctx.accounts.program_config.claim_fee;
        let fees_wallet = &ctx.accounts.fees_wallet;
        if tx_fee > 0 {
            let ix = anchor_lang::solana_program::system_instruction::transfer(
                &ctx.accounts.owner.key(),
                &fees_wallet.key(),
                tx_fee,
            );

            anchor_lang::solana_program::program::invoke(
                &ix,
                &[
                    ctx.accounts.owner.to_account_info(),
                    fees_wallet.to_account_info(),
                ],
            )?;
        }
    }

    match metadata.token_standard.as_ref().unwrap() {
        TokenStandard::ProgrammableNonFungible => {
            let token_record = ctx
                .accounts
                .nft_token_record
                .as_ref()
                .expect("token_record expected");

            if token_record.state != TokenState::Unlocked {
                return err!(CrowError::TokenIsLocked);
            }
        }
        _ => {}
    }

    require_gte!(current_time, asset.start_time, CrowError::CannotClaimYet);

    let authority_seed = &[
        &b"CROW"[..],
        &nft_mint_key.as_ref(),
        &authority_key.as_ref(),
        &[bump],
    ];

    match asset.asset_type {
        AssetType::Sol => {
            let destination = ctx.accounts.recipient.to_account_info();
            ctx.accounts.asset.close(destination)?;
        }
        AssetType::Token => {
            transfer(
                ctx.accounts
                    .transfer_token_ctx()
                    .with_signer(&[authority_seed]),
                asset.amount,
            )?;

            let remaining_balance = ctx
                .accounts
                .token_account
                .as_ref()
                .unwrap()
                .amount
                .checked_sub(asset.amount)
                .ok_or(CrowError::ProgramSubError)?;

            if remaining_balance <= 0 {
                close_account(
                    ctx.accounts
                        .close_account_ctx()
                        .with_signer(&[authority_seed]),
                )?;
            }
            let destination: AccountInfo<'_> = ctx.accounts.authority.to_account_info();
            ctx.accounts.asset.close(destination)?;
        }
        AssetType::Nft => {
            ctx.accounts.transfer_nft()?;

            close_account(
                ctx.accounts
                    .close_account_ctx()
                    .with_signer(&[authority_seed]),
            )?;
            let destination = ctx.accounts.authority.to_account_info();
            ctx.accounts.asset.close(destination)?;
        }
        _ => return err!(CrowError::AssetTypeNotSupported),
    }
    Ok(())
}
