use anchor_lang::prelude::*;
use anchor_spl::metadata::{Metadata, MetadataAccount};

use crate::{state::Crow, utils::init_crow};

#[derive(Accounts)]
pub struct Init<'info> {
    #[account(
        init,
        payer = payer,
        space = Crow::LEN,
        seeds = [
            b"CROW",
            nft_mint.key().as_ref()
        ],
        bump,
    )]
    pub crow: Box<Account<'info, Crow>>,

    /// CHECK: this account is checked in the instruction
    pub nft_mint: AccountInfo<'info>,

    #[account(
        seeds = [
            b"metadata",
            Metadata::id().as_ref(),
            nft_mint.key().as_ref()
        ],
        seeds::program = Metadata::id(),
        bump,
    )]
    pub nft_metadata: Option<Account<'info, MetadataAccount>>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn init_handler(ctx: Context<Init>) -> Result<()> {
    init_crow(
        &ctx.accounts.nft_mint,
        ctx.accounts
            .nft_metadata
            .as_ref()
            .map(|n| n.to_account_info()),
        &mut ctx.accounts.crow,
        ctx.bumps.crow,
    )?;
    Ok(())
}
