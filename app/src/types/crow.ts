export type Crow = {
  "version": "0.1.0",
  "name": "crow",
  "instructions": [
    {
      "name": "transferIn",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "crow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "escrowNftMetadata",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "escrowNftEdition",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "destinationToken",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feesWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWaiver",
          "isMut": false,
          "isSigner": true,
          "isOptional": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerTokenRecord",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authRules",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "authRulesProgram",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        }
      ],
      "args": [
        {
          "name": "assetType",
          "type": {
            "defined": "AssetType"
          }
        },
        {
          "name": "amount",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "startTime",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "endTime",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "vesting",
          "type": {
            "defined": "Vesting"
          }
        },
        {
          "name": "fee",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "init",
      "accounts": [
        {
          "name": "crow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferOut",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "crow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feesWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWaiver",
          "isMut": false,
          "isSigner": true,
          "isOptional": true
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftTokenRecord",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "nftToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "destinationToken",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "escrowNftMetadata",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "escrowNftEdition",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "ownerTokenRecord",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "delegate",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authRules",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "authRulesProgram",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        }
      ],
      "args": [
        {
          "name": "fee",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "toggleActive",
      "accounts": [
        {
          "name": "asset",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "active",
          "type": "bool"
        }
      ]
    },
    {
      "name": "initProgramConfig",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "claimFee",
          "type": "u64"
        },
        {
          "name": "distributeFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateProgramConfig",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "claimFee",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "distributeFee",
          "type": {
            "option": "u64"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "asset",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "crow",
            "docs": [
              "the crow this record belongs to (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "authority",
            "docs": [
              "the authority who can control this asset (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "assetType",
            "docs": [
              "the type of asset (1)"
            ],
            "type": {
              "defined": "AssetType"
            }
          },
          {
            "name": "tokenMint",
            "docs": [
              "the mint of the token (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "amount",
            "docs": [
              "the amount to claim (8)"
            ],
            "type": "u64"
          },
          {
            "name": "balance",
            "docs": [
              "the current balance (8)"
            ],
            "type": "u64"
          },
          {
            "name": "claimed",
            "docs": [
              "the claimed balance (8)"
            ],
            "type": "u64"
          },
          {
            "name": "startTime",
            "docs": [
              "when does this crow start (8)"
            ],
            "type": "i64"
          },
          {
            "name": "endTime",
            "docs": [
              "when does this crow end (1 + 8)"
            ],
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "vesting",
            "docs": [
              "the type of vesting (1 + 2)"
            ],
            "type": {
              "defined": "Vesting"
            }
          },
          {
            "name": "feesWaived",
            "docs": [
              "is this asset free to claim (1)"
            ],
            "type": "bool"
          },
          {
            "name": "active",
            "docs": [
              "is this asset active (1)"
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "crow",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nftMint",
            "docs": [
              "the nft mint the record belongs to (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "bump",
            "docs": [
              "bump of the authority (1)"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "programConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "claimFee",
            "docs": [
              "the amount payable for claims (8)"
            ],
            "type": "u64"
          },
          {
            "name": "distributeFee",
            "docs": [
              "the amount payable for distributing (8)"
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "the bump of the program_config account (1)"
            ],
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AssetType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Sol"
          },
          {
            "name": "Token"
          },
          {
            "name": "Nft"
          },
          {
            "name": "Cnft"
          }
        ]
      }
    },
    {
      "name": "Vesting",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Linear"
          },
          {
            "name": "Intervals",
            "fields": [
              {
                "name": "numIntervals",
                "type": "u16"
              }
            ]
          },
          {
            "name": "None"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "TransferInEvent",
      "fields": [
        {
          "name": "asset",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "TransferOutEvent",
      "fields": [
        {
          "name": "asset",
          "type": "publicKey",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TokenMintRequired",
      "msg": "Token mint is required with this asset type"
    },
    {
      "code": 6001,
      "name": "TokenMintNotRequired",
      "msg": "Token mint cannot be provided with this asset type"
    },
    {
      "code": 6002,
      "name": "AssetTypeNotSupported",
      "msg": "This asset type isn't yet supported"
    },
    {
      "code": 6003,
      "name": "UnexpectedAmount",
      "msg": "Amount cant be set with NFT type assets"
    },
    {
      "code": 6004,
      "name": "TokenNotNft",
      "msg": "Provided token_mint is not an NFT"
    },
    {
      "code": 6005,
      "name": "CannotClaimYet",
      "msg": "This asset cannot be claimed yet"
    },
    {
      "code": 6006,
      "name": "ProgramSubError",
      "msg": "Cannot subtract the given numbers"
    },
    {
      "code": 6007,
      "name": "Unauthorized",
      "msg": "Signer cannot perform this action"
    },
    {
      "code": 6008,
      "name": "TokenIsLocked",
      "msg": "The NFT for this Crow is locked"
    },
    {
      "code": 6009,
      "name": "AdminOnly",
      "msg": "This instruction can only be performed by the system admin"
    },
    {
      "code": 6010,
      "name": "EndTimeRequired",
      "msg": "This vesting type requires and end time"
    },
    {
      "code": 6011,
      "name": "InvalidEndTime",
      "msg": "End time must be after start time"
    },
    {
      "code": 6012,
      "name": "NotEnoughIntervals",
      "msg": "Number of intervals must be greater than 1"
    },
    {
      "code": 6013,
      "name": "InvalidVesting",
      "msg": "This asset type and vestion option are incompatible"
    },
    {
      "code": 6014,
      "name": "NothingToClaim",
      "msg": "No balance to claim yet"
    },
    {
      "code": 6015,
      "name": "NftCeption",
      "msg": "Cannot put an NFT into itself"
    },
    {
      "code": 6016,
      "name": "FeeWaiverNotProvided",
      "msg": "Fee waiver required as signer if providing a custom fee"
    }
  ]
};

export const IDL: Crow = {
  "version": "0.1.0",
  "name": "crow",
  "instructions": [
    {
      "name": "transferIn",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "crow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "escrowNftMetadata",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "escrowNftEdition",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "destinationToken",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feesWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWaiver",
          "isMut": false,
          "isSigner": true,
          "isOptional": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerTokenRecord",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authRules",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "authRulesProgram",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        }
      ],
      "args": [
        {
          "name": "assetType",
          "type": {
            "defined": "AssetType"
          }
        },
        {
          "name": "amount",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "startTime",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "endTime",
          "type": {
            "option": "i64"
          }
        },
        {
          "name": "vesting",
          "type": {
            "defined": "Vesting"
          }
        },
        {
          "name": "fee",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "init",
      "accounts": [
        {
          "name": "crow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferOut",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "crow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feesWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWaiver",
          "isMut": false,
          "isSigner": true,
          "isOptional": true
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftTokenRecord",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "nftToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "destinationToken",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "escrowNftMetadata",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "escrowNftEdition",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "ownerTokenRecord",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "delegate",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authRules",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "authRulesProgram",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        }
      ],
      "args": [
        {
          "name": "fee",
          "type": {
            "option": "u64"
          }
        }
      ]
    },
    {
      "name": "toggleActive",
      "accounts": [
        {
          "name": "asset",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "active",
          "type": "bool"
        }
      ]
    },
    {
      "name": "initProgramConfig",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "claimFee",
          "type": "u64"
        },
        {
          "name": "distributeFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateProgramConfig",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "claimFee",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "distributeFee",
          "type": {
            "option": "u64"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "asset",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "crow",
            "docs": [
              "the crow this record belongs to (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "authority",
            "docs": [
              "the authority who can control this asset (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "assetType",
            "docs": [
              "the type of asset (1)"
            ],
            "type": {
              "defined": "AssetType"
            }
          },
          {
            "name": "tokenMint",
            "docs": [
              "the mint of the token (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "amount",
            "docs": [
              "the amount to claim (8)"
            ],
            "type": "u64"
          },
          {
            "name": "balance",
            "docs": [
              "the current balance (8)"
            ],
            "type": "u64"
          },
          {
            "name": "claimed",
            "docs": [
              "the claimed balance (8)"
            ],
            "type": "u64"
          },
          {
            "name": "startTime",
            "docs": [
              "when does this crow start (8)"
            ],
            "type": "i64"
          },
          {
            "name": "endTime",
            "docs": [
              "when does this crow end (1 + 8)"
            ],
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "vesting",
            "docs": [
              "the type of vesting (1 + 2)"
            ],
            "type": {
              "defined": "Vesting"
            }
          },
          {
            "name": "feesWaived",
            "docs": [
              "is this asset free to claim (1)"
            ],
            "type": "bool"
          },
          {
            "name": "active",
            "docs": [
              "is this asset active (1)"
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "crow",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nftMint",
            "docs": [
              "the nft mint the record belongs to (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "bump",
            "docs": [
              "bump of the authority (1)"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "programConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "claimFee",
            "docs": [
              "the amount payable for claims (8)"
            ],
            "type": "u64"
          },
          {
            "name": "distributeFee",
            "docs": [
              "the amount payable for distributing (8)"
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "the bump of the program_config account (1)"
            ],
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AssetType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Sol"
          },
          {
            "name": "Token"
          },
          {
            "name": "Nft"
          },
          {
            "name": "Cnft"
          }
        ]
      }
    },
    {
      "name": "Vesting",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Linear"
          },
          {
            "name": "Intervals",
            "fields": [
              {
                "name": "numIntervals",
                "type": "u16"
              }
            ]
          },
          {
            "name": "None"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "TransferInEvent",
      "fields": [
        {
          "name": "asset",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "TransferOutEvent",
      "fields": [
        {
          "name": "asset",
          "type": "publicKey",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TokenMintRequired",
      "msg": "Token mint is required with this asset type"
    },
    {
      "code": 6001,
      "name": "TokenMintNotRequired",
      "msg": "Token mint cannot be provided with this asset type"
    },
    {
      "code": 6002,
      "name": "AssetTypeNotSupported",
      "msg": "This asset type isn't yet supported"
    },
    {
      "code": 6003,
      "name": "UnexpectedAmount",
      "msg": "Amount cant be set with NFT type assets"
    },
    {
      "code": 6004,
      "name": "TokenNotNft",
      "msg": "Provided token_mint is not an NFT"
    },
    {
      "code": 6005,
      "name": "CannotClaimYet",
      "msg": "This asset cannot be claimed yet"
    },
    {
      "code": 6006,
      "name": "ProgramSubError",
      "msg": "Cannot subtract the given numbers"
    },
    {
      "code": 6007,
      "name": "Unauthorized",
      "msg": "Signer cannot perform this action"
    },
    {
      "code": 6008,
      "name": "TokenIsLocked",
      "msg": "The NFT for this Crow is locked"
    },
    {
      "code": 6009,
      "name": "AdminOnly",
      "msg": "This instruction can only be performed by the system admin"
    },
    {
      "code": 6010,
      "name": "EndTimeRequired",
      "msg": "This vesting type requires and end time"
    },
    {
      "code": 6011,
      "name": "InvalidEndTime",
      "msg": "End time must be after start time"
    },
    {
      "code": 6012,
      "name": "NotEnoughIntervals",
      "msg": "Number of intervals must be greater than 1"
    },
    {
      "code": 6013,
      "name": "InvalidVesting",
      "msg": "This asset type and vestion option are incompatible"
    },
    {
      "code": 6014,
      "name": "NothingToClaim",
      "msg": "No balance to claim yet"
    },
    {
      "code": 6015,
      "name": "NftCeption",
      "msg": "Cannot put an NFT into itself"
    },
    {
      "code": 6016,
      "name": "FeeWaiverNotProvided",
      "msg": "Fee waiver required as signer if providing a custom fee"
    }
  ]
};
