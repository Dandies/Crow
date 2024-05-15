use anchor_lang::prelude::*;
use anchor_spl::{
    metadata::mpl_token_metadata::{accounts::Metadata, types::TokenStandard},
    token::ID as SPL_TOKEN_ID,
};

use crate::{
    constants::{CORE_PROGRAM, NIFTY_PROGRAM},
    state::Crow,
    CrowError,
};

pub fn init_crow(
    nft_mint: &AccountInfo,
    nft_metadata: Option<AccountInfo>,
    crow: &mut Account<Crow>,
    bump: u8,
) -> Result<()> {
    if nft_mint.owner == &SPL_TOKEN_ID {
        require!(nft_metadata.is_some(), CrowError::MissingMetadata);
        let nft_metadata = Metadata::try_from(&nft_metadata.unwrap()).unwrap();

        if !matches!(
            nft_metadata
                .token_standard
                .as_ref()
                .unwrap_or(&TokenStandard::NonFungible),
            TokenStandard::NonFungible
                | TokenStandard::ProgrammableNonFungible
                | TokenStandard::NonFungibleEdition
                | TokenStandard::ProgrammableNonFungibleEdition
        ) {
            return err!(CrowError::TokenNotNft);
        }
    } else {
        require!(nft_metadata.is_none(), CrowError::InvalidMetadata);

        let allowed_owners: Vec<Pubkey> = vec![NIFTY_PROGRAM, CORE_PROGRAM];
        require!(
            allowed_owners.contains(nft_mint.owner),
            CrowError::InvalidAssetType
        )
    }

    **crow = Crow::init(nft_mint.key(), bump);

    Ok(())
}
