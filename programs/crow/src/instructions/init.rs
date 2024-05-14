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
        payer = payer,
        space = Crow::LEN,
        seeds = [
            b"CROW",
            nft_mint.key().as_ref()
        ],
        bump,
    )]
    pub crow: Account<'info, Crow>,

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
    if ctx.accounts.nft_metadata.is_some() {
        if !matches!(
            ctx.accounts
                .nft_metadata
                .as_ref()
                .unwrap()
                .token_standard
                .as_ref()
                .unwrap_or(&TokenStandard::NonFungible),
            TokenStandard::NonFungible
                | TokenStandard::ProgrammableNonFungible
                | TokenStandard::NonFungibleEdition
                | TokenStandard::ProgrammableNonFungibleEdition
        ) {
            return err!(CrowError::TokenNotNft);
        }
    } else {
        require!(ctx.accounts.nft_mint.)
    }

    let crow = &mut ctx.accounts.crow;
    **crow = Crow::init(ctx.accounts.nft_mint.key(), ctx.bumps.crow);
    Ok(())
}
