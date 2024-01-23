use anchor_lang::prelude::*;
use anchor_spl::{
    metadata::{mpl_token_metadata::types::TokenStandard, Metadata, MetadataAccount},
    token::Mint,
};

use crate::{state::Crow, CrowError};

#[derive(Accounts)]
pub struct Init<'info> {
    #[account(
        init,
        space = Crow::LEN,
        payer = authority,
        seeds = [
            b"CROW",
            nft_mint.key().as_ref(),
            authority.key().as_ref()
        ],
        bump
    )]
    pub crow: Account<'info, Crow>,

    #[account(
        mint::decimals = 0,
        constraint = nft_mint.supply == 1 @ CrowError::TokenNotNft
    )]
    pub nft_mint: Account<'info, Mint>,

    #[account(
        seeds = [
            b"metadata",
            Metadata::id().as_ref(),
            nft_mint.key().as_ref()
        ],
        seeds::program = Metadata::id(),
        bump,
    )]
    pub nft_metadata: Account<'info, MetadataAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn init_handler(ctx: Context<Init>) -> Result<()> {
    let crow = &ctx.accounts.crow;
    let nft_mint = &ctx.accounts.nft_mint;
    let authority = &ctx.accounts.authority;

    if crow.nft_mint == Pubkey::default() {
        let crow = &mut ctx.accounts.crow;
        **crow = Crow::init(nft_mint.key(), authority.key(), ctx.bumps.crow);
    }

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

    Ok(())
}
