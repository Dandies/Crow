use anchor_lang::prelude::*;

use crate::{
    program::Crow as CrowProgram,
    state::{Asset, Crow, ProgramConfig},
    CrowError,
};

#[derive(Accounts)]
pub struct TransferOwnership<'info> {
    #[account(
        mut,
        has_one = crow
    )]
    asset: Account<'info, Asset>,

    #[account(
        seeds = [
            b"CROW",
            from_asset.key().as_ref()
        ],
        bump = crow.bump,
    )]
    crow: Account<'info, Crow>,

    #[account(
        init_if_needed,
        payer = authority,
        space = Crow::LEN,
        seeds = [
            b"CROW",
            to_asset.key().as_ref()
        ],
        bump,
    )]
    new_crow: Account<'info, Crow>,

    /// CHECK: seeds checked
    from_asset: AccountInfo<'info>,

    /// CHECK: seeds checked
    to_asset: AccountInfo<'info>,

    #[account(
        seeds = [b"program-config"],
        bump = program_config.bump
    )]
    pub program_config: Account<'info, ProgramConfig>,

    #[account(
        constraint = program.programdata_address()? == Some(program_data.key()) @ CrowError::AdminOnly
    )]
    pub program: Program<'info, CrowProgram>,

    #[account(
        constraint = program_data.upgrade_authority_address == Some(authority.key()) @ CrowError::AdminOnly
    )]
    pub program_data: Account<'info, ProgramData>,

    #[account(mut)]
    authority: Signer<'info>,

    system_program: Program<'info, System>,
}

pub fn transfer_ownership_handler(ctx: Context<TransferOwnership>) -> Result<()> {
    let new_crow = &ctx.accounts.new_crow;
    let asset = &mut ctx.accounts.asset;

    asset.crow = new_crow.key();

    Ok(())
}
