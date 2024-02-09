use anchor_lang::prelude::*;
use anchor_spl::metadata::MetadataAccount;

use crate::{constants::FEES_WAIVED_COLLECTION, CrowError};

pub fn is_fees_waived_collection(metadata: &MetadataAccount) -> bool {
    let collection = &metadata.collection;

    if collection.is_none() {
        return false;
    };

    let collection = collection.as_ref().unwrap();
    if !collection.verified {
        return false;
    };

    return collection.key == FEES_WAIVED_COLLECTION;
}

pub fn get_fee(
    metadata: &MetadataAccount,
    fee_waiver: bool,
    base_fee: u64,
    fee: Option<u64>,
) -> Result<u64> {
    let is_fees_waived_collection = is_fees_waived_collection(metadata);
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
