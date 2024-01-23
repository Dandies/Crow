use anchor_lang::prelude::*;

#[account]
pub struct Crow {
    /// the nft mint the record belongs to (32)
    pub nft_mint: Pubkey,
    /// the authority of the record (32)
    pub authority: Pubkey,
    /// can items be claimed from this Crow (1)
    pub active: bool,
    /// bump of the authority (1)
    pub bump: u8,
}

impl Crow {
    pub const LEN: usize = 8 + 32 + 32 + 1 + 1;

    pub fn init(nft_mint: Pubkey, authority: Pubkey, bump: u8) -> Self {
        Self {
            nft_mint,
            authority,
            active: true,
            bump,
        }
    }
}
