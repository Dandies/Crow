use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum AssetType {
    Sol,
    Token,
    Nft,
    Cnft,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum Vesting {
    Linear,
    Intervals { num_intervals: u16 },
    None,
}

#[account]
pub struct Asset {
    /// the crow this record belongs to (32)
    pub crow: Pubkey,
    /// the authority who can control this asset (32)
    pub authority: Pubkey,
    /// the type of asset (1)
    pub asset_type: AssetType,
    /// the mint of the token (32)
    pub token_mint: Pubkey,
    /// the amount to claim (8)
    pub amount: u64,
    /// the current balance (8)
    pub balance: u64,
    /// the claimed balance (8)
    pub claimed: u64,
    /// when does this crow start (8)
    pub start_time: i64,
    /// when does this crow end (1 + 8)
    pub end_time: Option<i64>,
    /// the type of vesting (1 + 2)
    pub vesting: Vesting,
    /// is this asset free to claim (1)
    pub fees_waived: bool,
    /// is this asset active (1)
    pub active: bool,
}

impl Asset {
    pub const LEN: usize = 8 + 32 + 32 + 1 + 32 + 8 + 8 + 8 + 8 + (1 + 8) + (1 + 2) + 1 + 1;

    pub fn init(
        crow: Pubkey,
        authority: Pubkey,
        asset_type: AssetType,
        token_mint: Option<Pubkey>,
        amount: u64,
        start_time: i64,
        end_time: Option<i64>,
        vesting: Vesting,
        fees_waived: bool,
    ) -> Self {
        Self {
            crow,
            authority,
            asset_type,
            token_mint: token_mint.unwrap_or(Pubkey::default()),
            amount,
            balance: amount,
            claimed: 0,
            start_time,
            end_time,
            vesting,
            fees_waived,
            active: true,
        }
    }
}
