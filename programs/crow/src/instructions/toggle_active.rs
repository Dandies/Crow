use anchor_lang::prelude::*;

use crate::{state::Asset, CrowError};

#[derive(Accounts)]
pub struct ToggleActive<'info> {
    #[account(
        mut,
        has_one = authority @ CrowError::Unauthorized
    )]
    pub asset: Account<'info, Asset>,

    pub authority: Signer<'info>,
}

pub fn toggle_active_handler(ctx: Context<ToggleActive>, active: bool) -> Result<()> {
    let asset = &mut ctx.accounts.asset;
    asset.active = active;
    Ok(())
}
