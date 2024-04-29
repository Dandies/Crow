export type NftEscrow = {
  "version": "0.1.0",
  "name": "nft_escrow",
  "instructions": [
    {
      "name": "init",
      "accounts": [
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
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
      "args": []
    },
    {
      "name": "fund",
      "accounts": [
        {
          "name": "crow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "nftEdition",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tokenAccount",
          "isMut": false,
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
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "destinationTokenRecord",
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
              "the mint of the token (1 + 32)"
            ],
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "amount",
            "docs": [
              "the amount to claim (8)"
            ],
            "type": "u64"
          },
          {
            "name": "startTime",
            "docs": [
              "the time this crow record can be claimed (8)"
            ],
            "type": "i64"
          },
          {
            "name": "bump",
            "docs": [
              "the bump of the asset (1)"
            ],
            "type": "u8"
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
            "name": "authority",
            "docs": [
              "the authority of the record (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "assets",
            "docs": [
              "all records linked to this mint (4)"
            ],
            "type": {
              "vec": "publicKey"
            }
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
    }
  ]
};

export const IDL: NftEscrow = {
  "version": "0.1.0",
  "name": "nft_escrow",
  "instructions": [
    {
      "name": "init",
      "accounts": [
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
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
      "args": []
    },
    {
      "name": "fund",
      "accounts": [
        {
          "name": "crow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "nftEdition",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tokenAccount",
          "isMut": false,
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
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "destinationTokenRecord",
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
              "the mint of the token (1 + 32)"
            ],
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "amount",
            "docs": [
              "the amount to claim (8)"
            ],
            "type": "u64"
          },
          {
            "name": "startTime",
            "docs": [
              "the time this crow record can be claimed (8)"
            ],
            "type": "i64"
          },
          {
            "name": "bump",
            "docs": [
              "the bump of the asset (1)"
            ],
            "type": "u8"
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
            "name": "authority",
            "docs": [
              "the authority of the record (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "assets",
            "docs": [
              "all records linked to this mint (4)"
            ],
            "type": {
              "vec": "publicKey"
            }
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
    }
  ]
};
