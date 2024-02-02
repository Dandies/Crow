use anchor_lang::prelude::*;

use crate::{program::Crow, state::ProgramConfig, CrowError};

#[derive(Accounts)]
pub struct UpdateProgramConfig<'info> {
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

pub fn update_program_config_handler(
    ctx: Context<UpdateProgramConfig>,
    claim_fee: Option<u64>,
    distribute_fee: Option<u64>,
) -> Result<()> {
    let program_config = &mut ctx.accounts.program_config;

    if claim_fee.is_some() {
        program_config.claim_fee = claim_fee.unwrap()
    }

    if distribute_fee.is_some() {
        program_config.distribute_fee = distribute_fee.unwrap()
    }

    Ok(())
}
