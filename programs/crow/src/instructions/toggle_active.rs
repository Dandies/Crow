use anchor_lang::prelude::*;

use crate::{state::Crow, CrowError};

#[derive(Accounts)]
pub struct ToggleActive<'info> {
    #[account(
        mut,
        seeds = [
            b"CROW",
            crow.nft_mint.as_ref(),
            crow.authority.as_ref()
        ],
        bump = crow.bump,
        has_one = authority @ CrowError::Unauthorized
    )]
    pub crow: Account<'info, Crow>,

    pub authority: Signer<'info>,
}

pub fn toggle_active_handler(ctx: Context<ToggleActive>, active: bool) -> Result<()> {
    let crow = &mut ctx.accounts.crow;
    crow.active = active;
    Ok(())
}
