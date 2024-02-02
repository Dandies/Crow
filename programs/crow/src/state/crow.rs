use anchor_lang::prelude::*;

#[account]
pub struct Crow {
    /// the nft mint the record belongs to (32)
    pub nft_mint: Pubkey,
    /// bump of the authority (1)
    pub bump: u8,
}

impl Crow {
    pub const LEN: usize = 8 + 32 + 1;

    pub fn init(nft_mint: Pubkey, bump: u8) -> Self {
        Self { nft_mint, bump }
    }
}
