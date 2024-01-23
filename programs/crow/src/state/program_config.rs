use anchor_lang::prelude::*;

#[account]
pub struct ProgramConfig {
    /// the amount payable for claims (8)
    pub claim_fee: u64,
    /// the amount payable for distributing (8)
    pub distribute_fee: u64,
    /// the bump of the program_config account (1)
    pub bump: u8,
}

impl ProgramConfig {
    pub const LEN: usize = 8 + 8 + 8 + 1;

    pub fn init(claim_fee: u64, distribute_fee: u64, bump: u8) -> Self {
        Self {
            claim_fee,
            distribute_fee,
            bump,
        }
    }
}
