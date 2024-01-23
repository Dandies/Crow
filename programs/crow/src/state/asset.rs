use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum AssetType {
    Sol,
    Token,
    Nft,
    Cnft,
}

#[account]
pub struct Asset {
    /// the crow this record belongs to (32)
    pub crow: Pubkey,
    /// the type of asset (1)
    pub asset_type: AssetType,
    /// the mint of the token (32)
    pub token_mint: Pubkey,
    /// the amount to claim (8)
    pub amount: u64,
    /// the time this crow record can be claimed (8)
    pub start_time: i64,
    /// is this asset free to claim (1)
    pub fees_waived: bool,
}

impl Asset {
    pub const LEN: usize = 8 + 32 + 1 + 32 + 8 + 8 + 1;

    pub fn init(
        crow: Pubkey,
        asset_type: AssetType,
        token_mint: Option<Pubkey>,
        amount: u64,
        start_time: i64,
        fees_waived: bool,
    ) -> Self {
        Self {
            crow,
            asset_type,
            token_mint: token_mint.unwrap_or(Pubkey::default()),
            amount,
            start_time,
            fees_waived,
        }
    }
}
