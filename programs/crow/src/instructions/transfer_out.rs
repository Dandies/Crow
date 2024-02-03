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
        close_account, spl_token::state::AccountState, transfer, CloseAccount, Mint, Token,
        TokenAccount, Transfer,
    },
};

use crate::{
    constants::{FEES_WALLET, FEE_WAIVER},
    state::{Asset, AssetType, Crow, ProgramConfig, Vesting},
    CrowError, TransferOutEvent,
};

#[derive(Accounts)]
pub struct TransferOut<'info> {
    #[account(
        seeds = [b"program-config"],
        bump = program_config.bump
    )]
    pub program_config: Box<Account<'info, ProgramConfig>>,

    #[account(
        seeds = [
            b"CROW",
            crow.nft_mint.as_ref(),
        ],
        bump = crow.bump,
        has_one = nft_mint
    )]
    pub crow: Box<Account<'info, Crow>>,

    #[account(
        mut,
        has_one = crow,
        has_one = authority
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

impl<'info> TransferOut<'info> {
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

        let authority_seed = &[&b"CROW"[..], &nft_mint_key.as_ref(), &[bump]];

        // performs the CPI
        cpi_transfer.invoke_signed(&[authority_seed])?;
        Ok(())
    }

    pub fn close_account_ctx(&self) -> CpiContext<'_, '_, '_, 'info, CloseAccount<'info>> {
        let cpi_accounts = CloseAccount {
            account: self.token_account.as_ref().unwrap().to_account_info(),
            destination: self.fees_wallet.to_account_info(),
            authority: self.crow.to_account_info(),
        };
        let cpi_program = self.token_program.to_account_info();
        CpiContext::new(cpi_program, cpi_accounts)
    }
}

pub fn transfer_out_handler(ctx: Context<TransferOut>, fee: Option<u64>) -> Result<()> {
    let current_time = Clock::get().unwrap().unix_timestamp;
    let asset = &ctx.accounts.asset;
    let crow = &ctx.accounts.crow;
    let metadata = &ctx.accounts.nft_metadata;
    let nft_mint_key = crow.nft_mint;
    let fees_wallet = &ctx.accounts.fees_wallet;
    let bump = crow.bump;

    if !asset.fees_waived {
        if ctx.accounts.fee_waiver.is_none() {
            require!(fee.is_none(), CrowError::FeeWaiverNotProvided);

            let tx_fee = ctx.accounts.program_config.claim_fee;

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
        } else {
            let fee = fee.unwrap_or(0);
            if fee > 0 {
                let ix = anchor_lang::solana_program::system_instruction::transfer(
                    &ctx.accounts.owner.key(),
                    &fees_wallet.key(),
                    fee,
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
    }

    let token_standard = metadata.token_standard.as_ref();

    if token_standard.is_some()
        && **token_standard.as_ref().unwrap() == TokenStandard::ProgrammableNonFungible
    {
        let token_record = ctx
            .accounts
            .nft_token_record
            .as_ref()
            .expect("token_record expected");

        if token_record.state != TokenState::Unlocked {
            return err!(CrowError::TokenIsLocked);
        }
    } else {
        require!(
            ctx.accounts.nft_token.state != AccountState::Frozen,
            CrowError::TokenIsLocked
        );
    }

    require_gte!(current_time, asset.start_time, CrowError::CannotClaimYet);

    let authority_seed = &[&b"CROW"[..], &nft_mint_key.as_ref(), &[bump]];

    let amount_to_claim = match asset.vesting {
        Vesting::Linear => {
            let end_time = asset.end_time.unwrap();
            let total_time = end_time - asset.start_time;
            let ref_time = i64::min(current_time, end_time);
            let time_spent = ref_time - asset.start_time;

            let ratio = (time_spent * 100 / total_time) as u64;

            let claimable_balance = asset.amount * ratio / 100;

            claimable_balance - asset.claimed
        }
        Vesting::Intervals { num_intervals } => {
            let num_intervals = num_intervals as i64;
            let total_time: i64 = asset.end_time.expect("End time expected") - asset.start_time;
            let time_spent = current_time - asset.start_time;

            let time_per_interval = total_time / num_intervals;
            let amount_per_interval = asset.amount / num_intervals as u64;

            let num_intervals_completed = (time_spent / time_per_interval) as u64;
            let claimable_balance = amount_per_interval * num_intervals_completed;
            claimable_balance - asset.claimed
        }
        _ => asset.balance,
    };

    let amount_to_claim = u64::min(amount_to_claim, ctx.accounts.asset.balance);

    require_gt!(amount_to_claim, 0, CrowError::NothingToClaim);

    msg!("amount_to_claim: {}", amount_to_claim);

    let new_balance: u64 = asset
        .balance
        .checked_sub(amount_to_claim)
        .ok_or(CrowError::ProgramSubError)?;

    let should_close = new_balance == 0;

    match asset.asset_type {
        AssetType::Sol => {
            let asset_account_info = ctx.accounts.asset.to_account_info();
            let recipient_account_info = ctx.accounts.recipient.to_account_info();
            let balance = asset_account_info.get_lamports();
            let min_balance = Rent::get()
                .unwrap()
                .minimum_balance(asset_account_info.data_len());

            let remainder = balance
                .checked_sub(amount_to_claim)
                .ok_or(CrowError::ProgramSubError)?;

            if remainder < min_balance {
                let destination = ctx.accounts.recipient.to_account_info();
                ctx.accounts.asset.close(destination)?;
            } else {
                asset_account_info.sub_lamports(amount_to_claim)?;
                recipient_account_info.add_lamports(amount_to_claim)?;
            }
        }
        AssetType::Token => {
            transfer(
                ctx.accounts
                    .transfer_token_ctx()
                    .with_signer(&[authority_seed]),
                amount_to_claim,
            )?;

            let remaining_balance = ctx
                .accounts
                .token_account
                .as_ref()
                .unwrap()
                .amount
                .checked_sub(amount_to_claim)
                .ok_or(CrowError::ProgramSubError)?;

            if remaining_balance <= 0 {
                close_account(
                    ctx.accounts
                        .close_account_ctx()
                        .with_signer(&[authority_seed]),
                )?;
            }
        }
        AssetType::Nft => {
            ctx.accounts.transfer_nft()?;

            close_account(
                ctx.accounts
                    .close_account_ctx()
                    .with_signer(&[authority_seed]),
            )?;
        }
        _ => return err!(CrowError::AssetTypeNotSupported),
    }

    if should_close && asset.asset_type != AssetType::Sol {
        let destination: AccountInfo<'_> = ctx.accounts.authority.to_account_info();
        ctx.accounts.asset.close(destination)?;
    } else {
        let asset = &mut ctx.accounts.asset;
        asset.balance = new_balance;
        asset.claimed += amount_to_claim;
    }

    emit!(TransferOutEvent {
        asset: ctx.accounts.asset.key()
    });

    Ok(())
}
