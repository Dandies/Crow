use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod utils;

use instructions::*;
use state::{AssetType, Vesting};

declare_id!("Crow6rDB5ZhGGqV2uXAG6Ta7aLvyw22vRNAcxd7mu2sv");

#[cfg(feature = "local-testing")]
pub mod constants {
    use solana_program::{pubkey, pubkey::Pubkey};
    pub const FEES_WALLET: Pubkey = pubkey!("B84GxkZDmXmbZ9PBK7yLvYpNhMX1TAUQ4T7tQWsukUyT");
    pub const FEE_WAIVER: Pubkey = pubkey!("9WUge3Kcva9dHBjCKc7KkdffYwshHJTAmeV1UHnhnhG3");
    pub const FEES_WAIVED_COLLECTION: Pubkey =
        pubkey!("TTPN34UsRSBxkEyuC5Zk48b4c5Wxy3wuVxFoPhTMu8a");
}

#[cfg(not(feature = "local-testing"))]
pub mod constants {
    use solana_program::{pubkey, pubkey::Pubkey};
    pub const FEES_WALLET: Pubkey = pubkey!("B84GxkZDmXmbZ9PBK7yLvYpNhMX1TAUQ4T7tQWsukUyT");
    pub const FEE_WAIVER: Pubkey = pubkey!("5d9sgp6xa6bif52EY1UrrPBUhfhYVdqzxvdSpdRexydQ");
    pub const FEES_WAIVED_COLLECTION: Pubkey =
        pubkey!("CdxKBSnipG5YD5KBuH3L1szmhPW1mwDHe6kQFR3nk9ys");
}

#[program]
pub mod crow {

    use super::*;

    pub fn transfer_in(
        ctx: Context<TransferIn>,
        asset_type: AssetType,
        amount: Option<u64>,
        start_time: Option<i64>,
        end_time: Option<i64>,
        vesting: Vesting,
        fee: Option<u64>,
    ) -> Result<()> {
        transfer_in_handler(ctx, asset_type, amount, start_time, end_time, vesting, fee)
    }

    pub fn init(ctx: Context<Init>) -> Result<()> {
        init_handler(ctx)
    }

    pub fn transfer_out(ctx: Context<TransferOut>, fee: Option<u64>) -> Result<()> {
        transfer_out_handler(ctx, fee)
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

    pub fn update_program_config(
        ctx: Context<UpdateProgramConfig>,
        claim_fee: Option<u64>,
        distribute_fee: Option<u64>,
    ) -> Result<()> {
        update_program_config_handler(ctx, claim_fee, distribute_fee)
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
    #[msg("This vesting type requires and end time")]
    EndTimeRequired,
    #[msg("End time must be after start time")]
    InvalidEndTime,
    #[msg("Number of intervals must be greater than 1")]
    NotEnoughIntervals,
    #[msg("This asset type and vestion option are incompatible")]
    InvalidVesting,
    #[msg("No balance to claim yet")]
    NothingToClaim,
    #[msg("Cannot put an NFT into itself")]
    NftCeption,
    #[msg("Fee waiver required as signer if providing a custom fee")]
    FeeWaiverNotProvided,
}

/// Emitted when tokens are claimed.
#[event]
pub struct TransferInEvent {
    /// Index of the claim.
    pub asset: Pubkey,
}

/// Emitted when tokens are claimed.
#[event]
pub struct TransferOutEvent {
    /// Index of the claim.
    pub asset: Pubkey,
}
