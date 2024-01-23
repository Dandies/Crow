use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;

use instructions::*;
use state::AssetType;

declare_id!("crow3inG2W8RJQW7iZ7ESo1r5rHbfCarikMeQhL1auG");

#[cfg(feature = "local-testing")]
pub mod constants {
    use solana_program::{pubkey, pubkey::Pubkey};
    pub const FEES_WALLET: Pubkey = pubkey!("B84GxkZDmXmbZ9PBK7yLvYpNhMX1TAUQ4T7tQWsukUyT");
    pub const FEE_WAIVER: Pubkey = pubkey!("9WUge3Kcva9dHBjCKc7KkdffYwshHJTAmeV1UHnhnhG3");
}

#[cfg(not(feature = "local-testing"))]
pub mod constants {
    use solana_program::{pubkey, pubkey::Pubkey};
    pub const FEES_WALLET: Pubkey = pubkey!("B84GxkZDmXmbZ9PBK7yLvYpNhMX1TAUQ4T7tQWsukUyT");
    pub const FEE_WAIVER: Pubkey = pubkey!("5d9sgp6xa6bif52EY1UrrPBUhfhYVdqzxvdSpdRexydQ");
}

#[program]
pub mod crow {

    use super::*;

    pub fn init(ctx: Context<Init>) -> Result<()> {
        init_handler(ctx)
    }

    pub fn fund(
        ctx: Context<Fund>,
        asset_type: AssetType,
        amount: Option<u64>,
        start_time: Option<i64>,
    ) -> Result<()> {
        fund_handler(ctx, asset_type, amount, start_time)
    }

    pub fn transfer(ctx: Context<Transfer>) -> Result<()> {
        transfer_handler(ctx)
    }

    pub fn toggle_active(ctx: Context<ToggleActive>, active: bool) -> Result<()> {
        toggle_active_handler(ctx, active)
    }

    pub fn init_program_config(
        ctx: Context<InitProgramConfig>,
        claim_fee: u64,
        distribute_fee: u64,
    ) -> Result<()> {
        init_program_config_handler(ctx, claim_fee, distribute_fee)
    }
}

#[error_code]
pub enum CrowError {
    #[msg("Token mint is required with this asset type")]
    TokenMintRequired,
    #[msg("Token mint cannot be provided with this asset type")]
    TokenMintNotRequired,
    #[msg("This asset type isn't yet supported")]
    AssetTypeNotSupported,
    #[msg("Amount cant be set with NFT type assets")]
    UnexpectedAmount,
    #[msg("Provided token_mint is not an NFT")]
    TokenNotNft,
    #[msg("This asset cannot be claimed yet")]
    CannotClaimYet,
    #[msg("Cannot subtract the given numbers")]
    ProgramSubError,
    #[msg("Signer cannot perform this action")]
    Unauthorized,
    #[msg("The NFT for this Crow is locked")]
    TokenIsLocked,
    #[msg("This instruction can only be performed by the system admin")]
    AdminOnly,
}
