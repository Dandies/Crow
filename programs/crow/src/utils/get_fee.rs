use anchor_lang::prelude::*;
use anchor_spl::metadata::mpl_token_metadata::accounts::Metadata;
use mpl_core::accounts::BaseAssetV1;
use nifty_asset::accounts::Asset;

use crate::{
    constants::{CORE_PROGRAM, DANDIES_PNFT, NIFTY_PROGRAM},
    CrowError,
};

pub fn get_collection(account: &AccountInfo) -> Option<Pubkey> {
    let owner = account.owner;

    if owner == &NIFTY_PROGRAM {
        let nifty_asset = Asset::try_from(account).unwrap();
        return nifty_asset.group.to_option();
    } else if owner == &CORE_PROGRAM {
        let core_asset = BaseAssetV1::try_from(account).unwrap();

        return match core_asset.update_authority {
            mpl_core::types::UpdateAuthority::Collection(pk) => Some(pk),
            _ => None,
        };
    } else {
        let metadata = Metadata::try_from(account).unwrap();
        let collection = metadata.collection;

        if collection.is_none() {
            return None;
        };

        let collection = collection.as_ref().unwrap();
        if !collection.verified {
            return None;
        };

        return Some(collection.key);
    }
}

pub fn get_fee(
    account: &AccountInfo,
    fee_waiver: bool,
    base_fee: u64,
    fee: Option<u64>,
) -> Result<u64> {
    let collection = get_collection(&account);
    let allowed_collections = vec![DANDIES_PNFT, DANDIES_PNFT];
    let is_fees_waived_collection =
        collection.is_some() && allowed_collections.contains(&collection.unwrap());

    if is_fees_waived_collection {
        return Ok(0);
    };

    if fee_waiver {
        let fee = fee.unwrap_or(0);
        return Ok(fee);
    } else {
        require!(fee.is_none(), CrowError::FeeWaiverNotProvided);

        return Ok(base_fee);
    }
}
