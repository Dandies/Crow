use anchor_lang::prelude::*;

use crate::{program::Crow, state::ProgramConfig, CrowError};

#[derive(Accounts)]
pub struct InitProgramConfig<'info> {
    #[account(
        init,
        space = ProgramConfig::LEN,
        payer = authority,
        seeds = [b"program-config"],
        bump
    )]
    pub program_config: Account<'info, ProgramConfig>,

    #[account(
        constraint = program.programdata_address()? == Some(program_data.key()) @ CrowError::AdminOnly
    )]
    pub program: Program<'info, Crow>,

    #[account(
        constraint = program_data.upgrade_authority_address == Some(authority.key()) @ CrowError::AdminOnly
    )]
    pub program_data: Account<'info, ProgramData>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn init_program_config_handler(
    ctx: Context<InitProgramConfig>,
    claim_fee: u64,
    distribute_fee: u64,
) -> Result<()> {
    let program_config = &mut ctx.accounts.program_config;

    **program_config = ProgramConfig::init(claim_fee, distribute_fee, ctx.bumps.program_config);

    Ok(())
}
