export type Stake = {
  version: "0.1.0"
  name: "stake"
  constants: [
    {
      name: "STAKING_ENDS"
      type: "i64"
      value: "2015762363"
    },
    {
      name: "WEIGHT"
      type: "u128"
      value: "1_000_000_000"
    }
  ]
  instructions: [
    {
      name: "init"
      accounts: [
        {
          name: "programConfig"
          isMut: true
          isSigner: false
        },
        {
          name: "staker"
          isMut: true
          isSigner: true
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenMint"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "usdcAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "subscriptionUsdcAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "subscriptionWallet"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "usdc"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "nftAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "slug"
          type: "string"
        },
        {
          name: "name"
          type: "string"
        },
        {
          name: "removeBranding"
          type: "bool"
        },
        {
          name: "ownDomain"
          type: "bool"
        },
        {
          name: "subscription"
          type: {
            option: {
              defined: "Subscription"
            }
          }
        },
        {
          name: "startDate"
          type: "i64"
        }
      ]
    },
    {
      name: "toggleStakeActive"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: false
          isSigner: true
        }
      ]
      args: [
        {
          name: "isActive"
          type: "bool"
        }
      ]
    },
    {
      name: "initDistribution"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "distribution"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenMint"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "vaultAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "label"
          type: "string"
        },
        {
          name: "uri"
          type: "string"
        },
        {
          name: "numShares"
          type: "u32"
        },
        {
          name: "amount"
          type: "u64"
        }
      ]
    },
    {
      name: "initCollection"
      accounts: [
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "collectionMint"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "custodial"
          type: "bool"
        },
        {
          name: "tokenVault"
          type: "bool"
        },
        {
          name: "stakingStartsAt"
          type: {
            option: "i64"
          }
        },
        {
          name: "maxStakersCount"
          type: "u64"
        }
      ]
    },
    {
      name: "delegateStake"
      accounts: [
        {
          name: "stake"
          isMut: true
          isSigner: false
        },
        {
          name: "delegate"
          isMut: false
          isSigner: false
        },
        {
          name: "authority"
          isMut: false
          isSigner: true
        }
      ]
      args: []
    },
    {
      name: "addEmission"
      accounts: [
        {
          name: "staker"
          isMut: false
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "collectionMetadata"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "collectionMint"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "emission"
          isMut: true
          isSigner: true
        },
        {
          name: "stakeTokenVault"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenMint"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "rewardType"
          type: {
            defined: "RewardType"
          }
        },
        {
          name: "reward"
          type: {
            option: "u64"
          }
        },
        {
          name: "startTime"
          type: {
            option: "i64"
          }
        },
        {
          name: "duration"
          type: {
            option: "i64"
          }
        },
        {
          name: "minimumPeriod"
          type: {
            option: "i64"
          }
        },
        {
          name: "startingBalance"
          type: {
            option: "u64"
          }
        }
      ]
    },
    {
      name: "distribute"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "distribution"
          isMut: true
          isSigner: false
        },
        {
          name: "shareRecord"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenMint"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "owner"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenVault"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "vaultAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "amount"
          type: "u64"
        },
        {
          name: "numItems"
          type: "u32"
        }
      ]
    },
    {
      name: "closeEmission"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "emission"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenMint"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "stakeTokenVault"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "deleteDistribution"
      accounts: [
        {
          name: "staker"
          isMut: false
          isSigner: false
        },
        {
          name: "distribution"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenMint"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenVault"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "vaultAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "updateTheme"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "logo"
          type: {
            option: "string"
          }
        },
        {
          name: "background"
          type: {
            option: "string"
          }
        },
        {
          name: "bodyFont"
          type: {
            option: {
              defined: "FontStyles"
            }
          }
        },
        {
          name: "headerFont"
          type: {
            option: {
              defined: "FontStyles"
            }
          }
        },
        {
          name: "primaryColor"
          type: {
            option: "string"
          }
        },
        {
          name: "secondaryColor"
          type: {
            option: "string"
          }
        },
        {
          name: "darkMode"
          type: {
            option: "bool"
          }
        }
      ]
    },
    {
      name: "toggleCollectionActive"
      accounts: [
        {
          name: "staker"
          isMut: false
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: false
          isSigner: true
        }
      ]
      args: [
        {
          name: "active"
          type: "bool"
        }
      ]
    },
    {
      name: "closeCollection"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "paySubscription"
      accounts: [
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "usdcAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "subscriptionUsdcAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "subscriptionWallet"
          isMut: false
          isSigner: false
        },
        {
          name: "usdc"
          isMut: false
          isSigner: false
        },
        {
          name: "authority"
          isMut: false
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "stake"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "nftRecord"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "stakeRecord"
          isMut: true
          isSigner: false
        },
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "nftMint"
          isMut: false
          isSigner: false
        },
        {
          name: "nftToken"
          isMut: true
          isSigner: false
        },
        {
          name: "nftMetadata"
          isMut: true
          isSigner: false
        },
        {
          name: "nftEdition"
          isMut: false
          isSigner: false
        },
        {
          name: "ownerTokenRecord"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "destinationTokenRecord"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "nftAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "nftCustody"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "signer"
          isMut: true
          isSigner: true
        },
        {
          name: "feesWallet"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "metadataProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "sysvarInstructions"
          isMut: false
          isSigner: false
        },
        {
          name: "authRules"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "authRulesProgram"
          isMut: false
          isSigner: false
          isOptional: true
        }
      ]
      args: [
        {
          name: "selection"
          type: {
            option: "u64"
          }
        }
      ]
    },
    {
      name: "stakeCore"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "nftRecord"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "stakeRecord"
          isMut: true
          isSigner: false
        },
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "asset"
          isMut: true
          isSigner: false
        },
        {
          name: "assetCollection"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "nftAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "signer"
          isMut: true
          isSigner: true
        },
        {
          name: "feesWallet"
          isMut: true
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "coreProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "selection"
          type: {
            option: "u64"
          }
        }
      ]
    },
    {
      name: "stakeNifty"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "nftRecord"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "stakeRecord"
          isMut: true
          isSigner: false
        },
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "asset"
          isMut: true
          isSigner: false
        },
        {
          name: "nftAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "signer"
          isMut: true
          isSigner: true
        },
        {
          name: "feesWallet"
          isMut: true
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "niftyProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "selection"
          type: {
            option: "u64"
          }
        }
      ]
    },
    {
      name: "claim"
      accounts: [
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "emission"
          isMut: true
          isSigner: false
        },
        {
          name: "stakeRecord"
          isMut: true
          isSigner: false
        },
        {
          name: "nftRecord"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "feesWallet"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenMint"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "stakeTokenVault"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "rewardReceiveAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "owner"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "claimDistribution"
      accounts: [
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "staker"
          isMut: false
          isSigner: false
        },
        {
          name: "distribution"
          isMut: true
          isSigner: false
        },
        {
          name: "feesWallet"
          isMut: true
          isSigner: false
        },
        {
          name: "shareRecord"
          isMut: true
          isSigner: false
        },
        {
          name: "owner"
          isMut: true
          isSigner: true
        },
        {
          name: "authority"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenMint"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenVault"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "vaultAuthority"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "cancelShare"
      accounts: [
        {
          name: "staker"
          isMut: false
          isSigner: false
        },
        {
          name: "distribution"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "shareRecord"
          isMut: true
          isSigner: false
        },
        {
          name: "owner"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenMint"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenVault"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "vaultAuthority"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "toggleDistribution"
      accounts: [
        {
          name: "staker"
          isMut: false
          isSigner: false
        },
        {
          name: "distribution"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: false
          isSigner: true
        }
      ]
      args: [
        {
          name: "active"
          type: "bool"
        }
      ]
    },
    {
      name: "unstake"
      accounts: [
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "stakeRecord"
          isMut: true
          isSigner: false
        },
        {
          name: "nftRecord"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "rewardMint"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "stakeTokenVault"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "rewardReceiveAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "nftMint"
          isMut: false
          isSigner: false
        },
        {
          name: "nftToken"
          isMut: true
          isSigner: false
        },
        {
          name: "feesWallet"
          isMut: true
          isSigner: false
        },
        {
          name: "nftMetadata"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenRecord"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "custodyTokenRecord"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "masterEdition"
          isMut: false
          isSigner: false
        },
        {
          name: "nftCustody"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenAuthority"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "nftAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "owner"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "metadataProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "sysvarInstructions"
          isMut: false
          isSigner: false
        },
        {
          name: "authRules"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "authRulesProgram"
          isMut: false
          isSigner: false
          isOptional: true
        }
      ]
      args: []
    },
    {
      name: "unstakeCore"
      accounts: [
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "stakeRecord"
          isMut: true
          isSigner: false
        },
        {
          name: "nftRecord"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "rewardMint"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "stakeTokenVault"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "rewardReceiveAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "nftMint"
          isMut: true
          isSigner: false
        },
        {
          name: "collectionMint"
          isMut: true
          isSigner: false
        },
        {
          name: "feesWallet"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenAuthority"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "nftAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "owner"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "coreProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "unstakeNifty"
      accounts: [
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "stakeRecord"
          isMut: true
          isSigner: false
        },
        {
          name: "nftRecord"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "rewardMint"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "stakeTokenVault"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "rewardReceiveAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "nftMint"
          isMut: true
          isSigner: false
        },
        {
          name: "collectionMint"
          isMut: false
          isSigner: false
        },
        {
          name: "feesWallet"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenAuthority"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "nftAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "owner"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "niftyProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "extendEmission"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: false
          isSigner: false
        },
        {
          name: "emission"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: false
          isSigner: true
        }
      ]
      args: [
        {
          name: "newEndingTime"
          type: "i64"
        }
      ]
    },
    {
      name: "addFunds"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "emission"
          isMut: true
          isSigner: false
        },
        {
          name: "rewardMint"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "stakeTokenVault"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "authority"
          isMut: false
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "amount"
          type: "u64"
        }
      ]
    },
    {
      name: "removeFunds"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "emission"
          isMut: true
          isSigner: false
        },
        {
          name: "rewardMint"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "stakeTokenVault"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "amount"
          type: {
            option: "u64"
          }
        }
      ]
    },
    {
      name: "changeReward"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "collection"
          isMut: true
          isSigner: false
        },
        {
          name: "emission"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "newReward"
          type: "u64"
        }
      ]
    },
    {
      name: "close"
      accounts: [
        {
          name: "programConfig"
          isMut: true
          isSigner: false
        },
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenMint"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "authority"
          isMut: false
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "updateStakeSubscription"
      accounts: [
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "signer"
          isMut: true
          isSigner: true
        },
        {
          name: "usdc"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "usdcAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "subscriptionUsdcAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "subscriptionWallet"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "program"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "programData"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
          isOptional: true
        }
      ]
      args: [
        {
          name: "subscription"
          type: {
            defined: "Subscription"
          }
        }
      ]
    },
    {
      name: "updateStakeRemoveBranding"
      accounts: [
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "signer"
          isMut: true
          isSigner: true
        },
        {
          name: "usdc"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "usdcAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "subscriptionUsdcAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "subscriptionWallet"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "program"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "programData"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
          isOptional: true
        }
      ]
      args: [
        {
          name: "removeBranding"
          type: "bool"
        }
      ]
    },
    {
      name: "updateStakeOwnDomain"
      accounts: [
        {
          name: "programConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "signer"
          isMut: true
          isSigner: true
        },
        {
          name: "usdc"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "usdcAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "subscriptionUsdcAccount"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "subscriptionWallet"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "program"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "programData"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
          isOptional: true
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
          isOptional: true
        }
      ]
      args: [
        {
          name: "ownDomain"
          type: "string"
        }
      ]
    },
    {
      name: "updateStakeNextPaymentTime"
      docs: ["these are admin only functions"]
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "program"
          isMut: false
          isSigner: false
        },
        {
          name: "programData"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "nextPaymentTime"
          type: "i64"
        }
      ]
    },
    {
      name: "clearClugs"
      accounts: [
        {
          name: "programConfig"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "program"
          isMut: false
          isSigner: false
        },
        {
          name: "programData"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "resize"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "program"
          isMut: false
          isSigner: false
        },
        {
          name: "programData"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "addToken"
      accounts: [
        {
          name: "staker"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenMint"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenAccount"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenVault"
          isMut: true
          isSigner: false
          isOptional: true
        },
        {
          name: "tokenAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "tokenVault"
          type: "bool"
        }
      ]
    },
    {
      name: "initProgramConfig"
      accounts: [
        {
          name: "programConfig"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "program"
          isMut: false
          isSigner: false
        },
        {
          name: "programData"
          isMut: false
          isSigner: false
        },
        {
          name: "subscriptionUsdcAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "subscriptionWallet"
          isMut: false
          isSigner: false
        },
        {
          name: "usdc"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "stakeFee"
          type: "u64"
        },
        {
          name: "unstakeFee"
          type: "u64"
        },
        {
          name: "claimFee"
          type: "u64"
        },
        {
          name: "advancedSubscriptionFee"
          type: "u64"
        },
        {
          name: "proSubscriptionFee"
          type: "u64"
        },
        {
          name: "ultimateSubscriptionFee"
          type: "u64"
        },
        {
          name: "extraCollectionFee"
          type: "u64"
        },
        {
          name: "removeBrandingFee"
          type: "u64"
        },
        {
          name: "ownDomainFee"
          type: "u64"
        }
      ]
    },
    {
      name: "updateProgramConfig"
      accounts: [
        {
          name: "programConfig"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "program"
          isMut: false
          isSigner: false
        },
        {
          name: "programData"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "stakeFee"
          type: {
            option: "u64"
          }
        },
        {
          name: "unstakeFee"
          type: {
            option: "u64"
          }
        },
        {
          name: "claimFee"
          type: {
            option: "u64"
          }
        },
        {
          name: "advancedSubscriptionFee"
          type: {
            option: "u64"
          }
        },
        {
          name: "proSubscriptionFee"
          type: {
            option: "u64"
          }
        },
        {
          name: "ultimateSubscriptionFee"
          type: {
            option: "u64"
          }
        },
        {
          name: "extraCollectionFee"
          type: {
            option: "u64"
          }
        },
        {
          name: "removeBrandingFee"
          type: {
            option: "u64"
          }
        },
        {
          name: "ownDomainFee"
          type: {
            option: "u64"
          }
        }
      ]
    },
    {
      name: "patchWeight"
      accounts: [
        {
          name: "staker"
          isMut: false
          isSigner: false
        },
        {
          name: "collection"
          isMut: false
          isSigner: false
        },
        {
          name: "emission"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        }
      ]
      args: [
        {
          name: "weight"
          type: "u128"
        }
      ]
    }
  ]
  accounts: [
    {
      name: "collection"
      type: {
        kind: "struct"
        fields: [
          {
            name: "staker"
            docs: ["staker this collection belongs to (32)"]
            type: "publicKey"
          },
          {
            name: "collectionMint"
            docs: ["MCC mint of the collection (32)"]
            type: "publicKey"
          },
          {
            name: "creators"
            docs: ["optional creators (4)"]
            type: {
              vec: "publicKey"
            }
          },
          {
            name: "custodial"
            docs: ["Collection custody type (1)"]
            type: "bool"
          },
          {
            name: "allowList"
            docs: ["Merkle root of allowlist (1 + 32)"]
            type: {
              option: "publicKey"
            }
          },
          {
            name: "tokenEmission"
            docs: ["pubkey of token emission config (1 + 32)"]
            type: {
              option: "publicKey"
            }
          },
          {
            name: "selectionEmission"
            docs: ["pubkey of selection emission config (1 + 32)"]
            type: {
              option: "publicKey"
            }
          },
          {
            name: "pointsEmission"
            docs: ["pubkey of points emission config (1 + 32)"]
            type: {
              option: "publicKey"
            }
          },
          {
            name: "distributionEmission"
            docs: ["pubkey of distribution emission config (1 + 32)"]
            type: {
              option: "publicKey"
            }
          },
          {
            name: "isActive"
            docs: ["items can be staked, rewards accrue (1)"]
            type: "bool"
          },
          {
            name: "maxStakersCount"
            docs: ["The max number of NFTs that can be staked (8)"]
            type: "u64"
          },
          {
            name: "currentStakersCount"
            docs: ["The current number of NFTs staked (8)"]
            type: "u64"
          },
          {
            name: "bump"
            docs: ["Bump of the Collection PDA (1)"]
            type: "u8"
          }
        ]
      }
    },
    {
      name: "distribution"
      type: {
        kind: "struct"
        fields: [
          {
            name: "staker"
            docs: ["staker this distribution belongs to (32)"]
            type: "publicKey"
          },
          {
            name: "label"
            docs: ["descriptor (4 + 20)"]
            type: "string"
          },
          {
            name: "tokenMint"
            docs: ["token mint, if not sol"]
            type: {
              option: "publicKey"
            }
          },
          {
            name: "uri"
            docs: ["uri link to offchain distribution log (4 + 63)"]
            type: "string"
          },
          {
            name: "totalAmount"
            docs: ["total amount of this distribution (8)"]
            type: "u64"
          },
          {
            name: "balance"
            docs: ["current balance of this distribution (8)"]
            type: "u64"
          },
          {
            name: "numShares"
            docs: ["total number of shares (4)"]
            type: "u32"
          },
          {
            name: "sharesFunded"
            docs: ["number of funded shares (4)"]
            type: "u32"
          },
          {
            name: "createdAt"
            docs: ["timestamp (8)"]
            type: "i64"
          },
          {
            name: "claimedAmount"
            docs: ["amount claimed (8)"]
            type: "u64"
          },
          {
            name: "complete"
            docs: ["have all shares been assigned? (1)"]
            type: "bool"
          },
          {
            name: "active"
            docs: ["can users claim? (1)"]
            type: "bool"
          },
          {
            name: "vaultAuthorityBump"
            docs: ["bump of the vault authority (1)"]
            type: "u8"
          }
        ]
      }
    },
    {
      name: "emission"
      type: {
        kind: "struct"
        fields: [
          {
            name: "collection"
            docs: ["the collection the emission belongs to (32)"]
            type: "publicKey"
          },
          {
            name: "merkleRoot"
            docs: ["the root hash (1 + 32),"]
            type: {
              option: "publicKey"
            }
          },
          {
            name: "rewardType"
            docs: ["The type of emission (1 + 32 + 1)"]
            type: {
              defined: "RewardType"
            }
          },
          {
            name: "reward"
            docs: ["The record of the current and the previous reward emissions (4 + 8)"]
            type: {
              vec: "u64"
            }
          },
          {
            name: "rewardChangeTime"
            docs: ["The record of the time when the emission changed (4 + 8)"]
            type: {
              vec: "i64"
            }
          },
          {
            name: "startTime"
            docs: ["Starting time of the staking (8)"]
            type: "i64"
          },
          {
            name: "tokenMint"
            docs: ["optional token mint (1 + 32)"]
            type: {
              option: "publicKey"
            }
          },
          {
            name: "tokenVault"
            docs: ["is token vault (1)"]
            type: "bool"
          },
          {
            name: "endTime"
            docs: ["The period for which the staking is funded (1 + 8)"]
            type: {
              option: "i64"
            }
          },
          {
            name: "stakedWeight"
            docs: ["Accrued weight of the staked NFTs (16)"]
            type: "u128"
          },
          {
            name: "currentBalance"
            docs: ["the current balance for this emission (8)"]
            type: "u64"
          },
          {
            name: "minimumPeriod"
            docs: ["The minimum stake period to be eligible for reward in seconds (1 + 8)"]
            type: {
              option: "i64"
            }
          },
          {
            name: "stakedItems"
            docs: ["number of staked items using this emission (8)"]
            type: "u64"
          },
          {
            name: "active"
            docs: ["is the emission active (1)"]
            type: "bool"
          }
        ]
      }
    },
    {
      name: "nftRecord"
      type: {
        kind: "struct"
        fields: [
          {
            name: "nftMint"
            docs: ["nft_mint public key (32)"]
            type: "publicKey"
          },
          {
            name: "points"
            docs: ["persistant points (8)"]
            type: "u64"
          },
          {
            name: "bump"
            docs: ["Bump of the NFT Record PDA (1)"]
            type: "u8"
          }
        ]
      }
    },
    {
      name: "programConfig"
      type: {
        kind: "struct"
        fields: [
          {
            name: "stakeFee"
            docs: ["tx fee for staking (8)"]
            type: "u64"
          },
          {
            name: "unstakeFee"
            docs: ["tx fee for unstaking (8)"]
            type: "u64"
          },
          {
            name: "claimFee"
            docs: ["tx fee for claiming (8)"]
            type: "u64"
          },
          {
            name: "advancedSubscriptionFee"
            docs: ["monthly fee for advanced (8)"]
            type: "u64"
          },
          {
            name: "proSubscriptionFee"
            docs: ["monthly fee for pro (8)"]
            type: "u64"
          },
          {
            name: "ultimateSubscriptionFee"
            docs: ["monthly fee for ultimate (8)"]
            type: "u64"
          },
          {
            name: "extraCollectionFee"
            docs: ["monthly fee for additional collections (8)"]
            type: "u64"
          },
          {
            name: "removeBrandingFee"
            docs: ["monthly fee for removing branding (8)"]
            type: "u64"
          },
          {
            name: "ownDomainFee"
            docs: ["monthly fee for own domain (8)"]
            type: "u64"
          },
          {
            name: "slugs"
            docs: ["a vector storing all slugs (4)"]
            type: {
              vec: "string"
            }
          },
          {
            name: "bump"
            docs: ["bump for the program config account (1)"]
            type: "u8"
          }
        ]
      }
    },
    {
      name: "shareRecord"
      type: {
        kind: "struct"
        fields: [
          {
            name: "owner"
            docs: ["owner of the share record (32)"]
            type: "publicKey"
          },
          {
            name: "distribution"
            docs: ["distribution this record belongs to (32)"]
            type: "publicKey"
          },
          {
            name: "amount"
            docs: ["amount in basis points (8)"]
            type: "u64"
          },
          {
            name: "numItems"
            docs: ["number of items (4)"]
            type: "u32"
          },
          {
            name: "bump"
            docs: ["bump of the share_record account (1)"]
            type: "u8"
          }
        ]
      }
    },
    {
      name: "stakeRecord"
      type: {
        kind: "struct"
        fields: [
          {
            name: "staker"
            docs: ["staker that this record belongs to (32)"]
            type: "publicKey"
          },
          {
            name: "owner"
            docs: ["owner of the NFT 32"]
            type: "publicKey"
          },
          {
            name: "nftMint"
            docs: ["mint of the staked NFT (32)"]
            type: "publicKey"
          },
          {
            name: "emissions"
            docs: ["emissions (4 + 32 * 4),"]
            type: {
              vec: "publicKey"
            }
          },
          {
            name: "pendingClaim"
            docs: ["pending token balance to claim (8)"]
            type: "u64"
          },
          {
            name: "canClaimAt"
            docs: ["timestamp of when can claim (8)"]
            type: "i64"
          },
          {
            name: "solBalance"
            docs: ["sol balance to claim (8)"]
            type: "u64"
          },
          {
            name: "stakedAt"
            docs: ["Staking timestamp (8)"]
            type: "i64"
          },
          {
            name: "bump"
            docs: ["Bump of the Stake Record PDA (1)"]
            type: "u8"
          }
        ]
      }
    },
    {
      name: "staker"
      type: {
        kind: "struct"
        fields: [
          {
            name: "authority"
            docs: ["The authority of the staker (32)"]
            type: "publicKey"
          },
          {
            name: "slug"
            docs: ["slug, max 50 chars (50 + 4)"]
            type: "string"
          },
          {
            name: "name"
            docs: ["name of the project, max 50 chars (50 + 4)"]
            type: "string"
          },
          {
            name: "customDomain"
            docs: ["optional custom domain, max 50 chars (1 + 4 + 50),"]
            type: {
              option: "string"
            }
          },
          {
            name: "theme"
            docs: ["Active theme struct"]
            type: {
              defined: "Theme"
            }
          },
          {
            name: "isActive"
            docs: ["Staker status (1)"]
            type: "bool"
          },
          {
            name: "removeBranding"
            docs: ["Branding removed (1)"]
            type: "bool"
          },
          {
            name: "ownDomain"
            docs: ["Branding removed (1)"]
            type: "bool"
          },
          {
            name: "subscription"
            docs: ["Subscription level (1 + 32)"]
            type: {
              defined: "Subscription"
            }
          },
          {
            name: "prevSubscription"
            docs: ["Subscription level (1 + 32)"]
            type: {
              defined: "Subscription"
            }
          },
          {
            name: "subscriptionLiveDate"
            docs: ["Date the subscription will become live (8)"]
            type: "i64"
          },
          {
            name: "collections"
            type: {
              vec: "publicKey"
            }
          },
          {
            name: "tokenAuthBump"
            docs: ["The bump of the token authority PDA (1)"]
            type: "u8"
          },
          {
            name: "nftAuthBump"
            docs: ["The bump of the NFT authority PDA (1)"]
            type: "u8"
          },
          {
            name: "startDate"
            docs: ["staking start time  (8)"]
            type: "i64"
          },
          {
            name: "tokenMint"
            docs: ["optional token mint with mint auth (1 + 32)"]
            type: {
              option: "publicKey"
            }
          },
          {
            name: "tokenVault"
            docs: ["use a token vault (1)"]
            type: "bool"
          },
          {
            name: "nextPaymentTime"
            docs: ["timestamp the next payment is due  (8)"]
            type: "i64"
          },
          {
            name: "numberStaked"
            docs: ["number of staked items (4)"]
            type: "u32"
          }
        ]
      }
    },
    {
      name: "userRecord"
      type: {
        kind: "struct"
        fields: [
          {
            name: "itemsStaked"
            type: "u32"
          }
        ]
      }
    }
  ]
  types: [
    {
      name: "Choice"
      type: {
        kind: "struct"
        fields: [
          {
            name: "reward"
            docs: ["reward per second"]
            type: "u64"
          },
          {
            name: "duration"
            docs: ["time in seconds"]
            type: "i64"
          },
          {
            name: "lock"
            docs: ["whether to enforce min term"]
            type: "bool"
          }
        ]
      }
    },
    {
      name: "FontStyles"
      type: {
        kind: "struct"
        fields: [
          {
            name: "fontFamily"
            docs: ["The font family (1)"]
            type: {
              defined: "FontFamily"
            }
          },
          {
            name: "bold"
            docs: ["bold or normal (1)"]
            type: "bool"
          },
          {
            name: "uppercase"
            docs: ["uppercase or normal (1)"]
            type: "bool"
          }
        ]
      }
    },
    {
      name: "Theme"
      type: {
        kind: "struct"
        fields: [
          {
            name: "logo"
            docs: ["Link to offchain logo (1 + 1)"]
            type: {
              option: "u8"
            }
          },
          {
            name: "background"
            docs: ["Link to offchain bg (1 + 1)"]
            type: "u8"
          },
          {
            name: "logos"
            docs: ["All uploaded logos (4)"]
            type: {
              vec: "string"
            }
          },
          {
            name: "backgrounds"
            docs: ["All uploaded bgs (4)"]
            type: {
              vec: "string"
            }
          },
          {
            name: "bodyFont"
            docs: ["Body font styles (3)"]
            type: {
              defined: "FontStyles"
            }
          },
          {
            name: "headerFont"
            docs: ["Header font styles (3)"]
            type: {
              defined: "FontStyles"
            }
          },
          {
            name: "primaryColor"
            docs: ["Hexadecimal (string) color (4 + 6)"]
            type: "string"
          },
          {
            name: "secondaryColor"
            docs: ["Hexadecimal (string) color (4 + 6)"]
            type: "string"
          },
          {
            name: "darkMode"
            docs: ["Whether dark mode is enabled (1)"]
            type: "bool"
          }
        ]
      }
    },
    {
      name: "RewardType"
      type: {
        kind: "enum"
        variants: [
          {
            name: "Token"
          },
          {
            name: "Selection"
            fields: [
              {
                name: "options"
                type: {
                  vec: {
                    defined: "Choice"
                  }
                }
              }
            ]
          },
          {
            name: "Points"
          },
          {
            name: "Distribution"
          }
        ]
      }
    },
    {
      name: "Subscription"
      type: {
        kind: "enum"
        variants: [
          {
            name: "Penalty"
          },
          {
            name: "Free"
          },
          {
            name: "Advanced"
          },
          {
            name: "Pro"
          },
          {
            name: "Ultimate"
          },
          {
            name: "Custom"
            fields: [
              {
                name: "amount"
                type: "u64"
              },
              {
                name: "stakeFee"
                type: "u64"
              },
              {
                name: "unstakeFee"
                type: "u64"
              },
              {
                name: "claimFee"
                type: "u64"
              }
            ]
          }
        ]
      }
    },
    {
      name: "FontFamily"
      type: {
        kind: "enum"
        variants: [
          {
            name: "Roboto"
          },
          {
            name: "OpenSans"
          },
          {
            name: "Montserrat"
          },
          {
            name: "Lato"
          },
          {
            name: "Poppins"
          },
          {
            name: "SourceSans3"
          },
          {
            name: "LeagueGothic"
          },
          {
            name: "Raleway"
          },
          {
            name: "NotoSans"
          },
          {
            name: "Inter"
          },
          {
            name: "RobotoSlab"
          },
          {
            name: "Merriweather"
          },
          {
            name: "PlayfairDisplay"
          },
          {
            name: "RobotoMono"
          },
          {
            name: "Quattrocento"
          },
          {
            name: "QuattrocentoSans"
          },
          {
            name: "Kanit"
          },
          {
            name: "Nunito"
          },
          {
            name: "WorkSans"
          }
        ]
      }
    },
    {
      name: "FeeType"
      type: {
        kind: "enum"
        variants: [
          {
            name: "Stake"
          },
          {
            name: "Unstake"
          },
          {
            name: "Claim"
          }
        ]
      }
    }
  ]
  errors: [
    {
      code: 6000
      name: "SlugTooLong"
      msg: "Slug must be max 50 chars"
    },
    {
      code: 6001
      name: "SlugRequired"
      msg: "Slug must be provided"
    },
    {
      code: 6002
      name: "NameTooLong"
      msg: "Name must be max 50 chars"
    },
    {
      code: 6003
      name: "NameRequired"
      msg: "Name must be provided"
    },
    {
      code: 6004
      name: "ProfanityDetected"
      msg: "Profanity cannot be used in a name"
    },
    {
      code: 6005
      name: "SlugExists"
      msg: "Slug already exists - contact us if you think this is an error"
    },
    {
      code: 6006
      name: "InsufficientBalanceInVault"
      msg: "insuficient balance for new staking duration, add funds before extending"
    },
    {
      code: 6007
      name: "StakeOver"
      msg: "this STAKE is completed"
    },
    {
      code: 6008
      name: "StakeNotLive"
      msg: "this STAKE is not yet live"
    },
    {
      code: 6009
      name: "MaxStakersReached"
      msg: "max stakers have been reached"
    },
    {
      code: 6010
      name: "StakeInactive"
      msg: "this staker is inactive"
    },
    {
      code: 6011
      name: "CollectionInactive"
      msg: "this collection is inactive"
    },
    {
      code: 6012
      name: "CollectionActive"
      msg: "this collection is still inactive"
    },
    {
      code: 6013
      name: "InvalidCollection"
      msg: "nft is not included in the allowed collection"
    },
    {
      code: 6014
      name: "CollectionNotVerified"
      msg: "collection must be verified"
    },
    {
      code: 6015
      name: "TokenNotNFT"
      msg: "token is not an NFT"
    },
    {
      code: 6016
      name: "NoRewardMint"
      msg: "no reward mint has been configured for this stake"
    },
    {
      code: 6017
      name: "InvalidRewardToken"
      msg: "unexpected reward token"
    },
    {
      code: 6018
      name: "UnexpectedRemainingAccounts"
      msg: "unexpected number of remaining accounts"
    },
    {
      code: 6019
      name: "TokenAccountEmpty"
      msg: "token account must contain 1 token"
    },
    {
      code: 6020
      name: "NegativePeriodValue"
      msg: "the minimum staking period in seconds can't be negative"
    },
    {
      code: 6021
      name: "InvalidStakeEndTime"
      msg: "stake ends time must be greater than the current time and the start time"
    },
    {
      code: 6022
      name: "StakeEndTimeRequired"
      msg: "Stake end time required if using a token vault"
    },
    {
      code: 6023
      name: "StartTimeInPast"
      msg: "start time cannot be in the past"
    },
    {
      code: 6024
      name: "TooManyStakers"
      msg: "max stakers can't be higher than the total collection size"
    },
    {
      code: 6025
      name: "NotEnoughStakers"
      msg: "max stakers must be larger than 0"
    },
    {
      code: 6026
      name: "FailedTimeConversion"
      msg: "failed to convert the time to i64"
    },
    {
      code: 6027
      name: "StakeBumpError"
      msg: "unable to get stake details bump"
    },
    {
      code: 6028
      name: "ProgramSubError"
      msg: "unable to subtract the given values"
    },
    {
      code: 6029
      name: "ProgramMulError"
      msg: "unable to multiply the given values"
    },
    {
      code: 6030
      name: "ProgramDivError"
      msg: "unable to divide the given values"
    },
    {
      code: 6031
      name: "ProgramAddError"
      msg: "unable to add the given values"
    },
    {
      code: 6032
      name: "MinimumPeriodNotReached"
      msg: "minimum staking period not reached"
    },
    {
      code: 6033
      name: "InstructionBuilderFailed"
      msg: "failed to build instruction"
    },
    {
      code: 6034
      name: "PaymentNotDueYet"
      msg: "payment isn't yet due"
    },
    {
      code: 6035
      name: "NoPaymentDue"
      msg: "no payment due"
    },
    {
      code: 6036
      name: "AdminOnly"
      msg: "only the system admin can use this instruction"
    },
    {
      code: 6037
      name: "Unauthorized"
      msg: "the current signer doesn't have permission to perform this action"
    },
    {
      code: 6038
      name: "MaxCollections"
      msg: "this STAKE has reached its maximum collections"
    },
    {
      code: 6039
      name: "UpdateAuthRequired"
      msg: "update authority approval is required for minimum-term locking"
    },
    {
      code: 6040
      name: "LockingPeriodTooLong"
      msg: "enforced locking period cannot be longer than 1 year"
    },
    {
      code: 6041
      name: "LockingPeriodTooShort"
      msg: "enforced locking period must be longer than 1 second"
    },
    {
      code: 6042
      name: "InvalidProgramData"
      msg: "an invalid programData account was provided"
    },
    {
      code: 6043
      name: "StakeInArrears"
      msg: "addons cannot be added to a STAKE in arrears"
    },
    {
      code: 6044
      name: "DurationRequired"
      msg: "duration is required if using a token vault"
    },
    {
      code: 6045
      name: "DurationTooShort"
      msg: "duration must me more than 0"
    },
    {
      code: 6046
      name: "CannotExtendNoEndDate"
      msg: "cannot extend as no end date set"
    },
    {
      code: 6047
      name: "CollectionsMissing"
      msg: "all linked collections must be passed in remaining accounts"
    },
    {
      code: 6048
      name: "EmissionsMissing"
      msg: "all emissions must be passed in remaining accounts"
    },
    {
      code: 6049
      name: "NoTokensToClaim"
      msg: "There are no tokens to claim for this collection"
    },
    {
      code: 6050
      name: "CollectionHasStakers"
      msg: "There are still active stakers who have yet to claim"
    },
    {
      code: 6051
      name: "InvalidSlug"
      msg: "Slug must be a valid URL slug"
    },
    {
      code: 6052
      name: "InvalidImage"
      msg: "Only accepts full arweave images"
    },
    {
      code: 6053
      name: "ImageTooLong"
      msg: "Max 63 chars"
    },
    {
      code: 6054
      name: "InvalidColor"
      msg: "Only hexadecimal colors are accepted - eg 0BFFD0"
    },
    {
      code: 6055
      name: "StillHasCollections"
      msg: "Cannot close a staker that still has collections"
    },
    {
      code: 6056
      name: "StillHasStakedItems"
      msg: "Cannot close a staker that still has staked items"
    },
    {
      code: 6057
      name: "FrontLoadNotLocked"
      msg: "Tokens can only be front loaded with enforced minimum period emissions"
    },
    {
      code: 6058
      name: "InvalidEmissions"
      msg: "Selected emission(s) do not exist"
    },
    {
      code: 6059
      name: "InvalidEmissionPeriods"
      msg: "One or more selected emissions is not active"
    },
    {
      code: 6060
      name: "NoEmissionsToAdd"
      msg: "At least one emission must be provided"
    },
    {
      code: 6061
      name: "NoMinPeriodWithOption"
      msg: "Minimum period cannot by used with multiple option emissions"
    },
    {
      code: 6062
      name: "RewardRequired"
      msg: "Reward required with this emission type"
    },
    {
      code: 6063
      name: "InvalidEmission"
      msg: "Invalid emission"
    },
    {
      code: 6064
      name: "EmissionSelectionRequired"
      msg: "A selection is required for this emission"
    },
    {
      code: 6065
      name: "InvalidIndex"
      msg: "This index is invalid"
    },
    {
      code: 6066
      name: "SelectionEmissionExists"
      msg: "Only one selection type emission can exist per collection"
    },
    {
      code: 6067
      name: "StillHasEmissions"
      msg: "This collection still has active emissions"
    },
    {
      code: 6068
      name: "NoAuthority"
      msg: "The program doesn't have mint auth for this token"
    },
    {
      code: 6069
      name: "EmissionNotActive"
      msg: "This emission is not active"
    },
    {
      code: 6070
      name: "TokenMintRequired"
      msg: "This emission type needs a token mint"
    },
    {
      code: 6071
      name: "TokenExists"
      msg: "This collection already has a token"
    },
    {
      code: 6072
      name: "TokenVaultRequired"
      msg: "Token vault address is required"
    },
    {
      code: 6073
      name: "InvalidCreator"
      msg: "Invalid creator for NFT"
    },
    {
      code: 6074
      name: "LabelTooLong"
      msg: "Label max length is 20 chars"
    },
    {
      code: 6075
      name: "AmountTooLow"
      msg: "Amount must be greater than 0"
    },
    {
      code: 6076
      name: "TotalSharesFunded"
      msg: "The total shares have already been funded for this distribution"
    },
    {
      code: 6077
      name: "DistributionInactive"
      msg: "This distribution is inactive"
    },
    {
      code: 6078
      name: "DistributionIncomplete"
      msg: "This distribution hasn't been completed yet"
    },
    {
      code: 6079
      name: "InvalidInstruction"
      msg: "This instruction cannot be used for this asset type"
    },
    {
      code: 6080
      name: "NonCustodialOnly"
      msg: "This asset type can only be staked non-custodially"
    }
  ]
}

export const IDL: Stake = {
  version: "0.1.0",
  name: "stake",
  constants: [
    {
      name: "STAKING_ENDS",
      type: "i64",
      value: "2015762363",
    },
    {
      name: "WEIGHT",
      type: "u128",
      value: "1_000_000_000",
    },
  ],
  instructions: [
    {
      name: "init",
      accounts: [
        {
          name: "programConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "usdcAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "subscriptionUsdcAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "subscriptionWallet",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "usdc",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nftAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "slug",
          type: "string",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "removeBranding",
          type: "bool",
        },
        {
          name: "ownDomain",
          type: "bool",
        },
        {
          name: "subscription",
          type: {
            option: {
              defined: "Subscription",
            },
          },
        },
        {
          name: "startDate",
          type: "i64",
        },
      ],
    },
    {
      name: "toggleStakeActive",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "isActive",
          type: "bool",
        },
      ],
    },
    {
      name: "initDistribution",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "distribution",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "label",
          type: "string",
        },
        {
          name: "uri",
          type: "string",
        },
        {
          name: "numShares",
          type: "u32",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "initCollection",
      accounts: [
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collectionMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "custodial",
          type: "bool",
        },
        {
          name: "tokenVault",
          type: "bool",
        },
        {
          name: "stakingStartsAt",
          type: {
            option: "i64",
          },
        },
        {
          name: "maxStakersCount",
          type: "u64",
        },
      ],
    },
    {
      name: "delegateStake",
      accounts: [
        {
          name: "stake",
          isMut: true,
          isSigner: false,
        },
        {
          name: "delegate",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "addEmission",
      accounts: [
        {
          name: "staker",
          isMut: false,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collectionMetadata",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "collectionMint",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "emission",
          isMut: true,
          isSigner: true,
        },
        {
          name: "stakeTokenVault",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "rewardType",
          type: {
            defined: "RewardType",
          },
        },
        {
          name: "reward",
          type: {
            option: "u64",
          },
        },
        {
          name: "startTime",
          type: {
            option: "i64",
          },
        },
        {
          name: "duration",
          type: {
            option: "i64",
          },
        },
        {
          name: "minimumPeriod",
          type: {
            option: "i64",
          },
        },
        {
          name: "startingBalance",
          type: {
            option: "u64",
          },
        },
      ],
    },
    {
      name: "distribute",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "distribution",
          isMut: true,
          isSigner: false,
        },
        {
          name: "shareRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "numItems",
          type: "u32",
        },
      ],
    },
    {
      name: "closeEmission",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "emission",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "stakeTokenVault",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "deleteDistribution",
      accounts: [
        {
          name: "staker",
          isMut: false,
          isSigner: false,
        },
        {
          name: "distribution",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateTheme",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "logo",
          type: {
            option: "string",
          },
        },
        {
          name: "background",
          type: {
            option: "string",
          },
        },
        {
          name: "bodyFont",
          type: {
            option: {
              defined: "FontStyles",
            },
          },
        },
        {
          name: "headerFont",
          type: {
            option: {
              defined: "FontStyles",
            },
          },
        },
        {
          name: "primaryColor",
          type: {
            option: "string",
          },
        },
        {
          name: "secondaryColor",
          type: {
            option: "string",
          },
        },
        {
          name: "darkMode",
          type: {
            option: "bool",
          },
        },
      ],
    },
    {
      name: "toggleCollectionActive",
      accounts: [
        {
          name: "staker",
          isMut: false,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "active",
          type: "bool",
        },
      ],
    },
    {
      name: "closeCollection",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "paySubscription",
      accounts: [
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "usdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "subscriptionUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "subscriptionWallet",
          isMut: false,
          isSigner: false,
        },
        {
          name: "usdc",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "stake",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftRecord",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "stakeRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nftMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nftToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftEdition",
          isMut: false,
          isSigner: false,
        },
        {
          name: "ownerTokenRecord",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "destinationTokenRecord",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "nftAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nftCustody",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "feesWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadataProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarInstructions",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authRules",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "authRulesProgram",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
      ],
      args: [
        {
          name: "selection",
          type: {
            option: "u64",
          },
        },
      ],
    },
    {
      name: "stakeCore",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftRecord",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "stakeRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "asset",
          isMut: true,
          isSigner: false,
        },
        {
          name: "assetCollection",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "nftAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "feesWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "coreProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "selection",
          type: {
            option: "u64",
          },
        },
      ],
    },
    {
      name: "stakeNifty",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftRecord",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "stakeRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "asset",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "feesWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "niftyProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "selection",
          type: {
            option: "u64",
          },
        },
      ],
    },
    {
      name: "claim",
      accounts: [
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "emission",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftRecord",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "feesWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "stakeTokenVault",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "rewardReceiveAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "claimDistribution",
      accounts: [
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: false,
          isSigner: false,
        },
        {
          name: "distribution",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feesWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "shareRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "cancelShare",
      accounts: [
        {
          name: "staker",
          isMut: false,
          isSigner: false,
        },
        {
          name: "distribution",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "shareRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "vaultAuthority",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "toggleDistribution",
      accounts: [
        {
          name: "staker",
          isMut: false,
          isSigner: false,
        },
        {
          name: "distribution",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "active",
          type: "bool",
        },
      ],
    },
    {
      name: "unstake",
      accounts: [
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftRecord",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "rewardMint",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "stakeTokenVault",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "rewardReceiveAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "nftMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nftToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feesWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMetadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenRecord",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "custodyTokenRecord",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "masterEdition",
          isMut: false,
          isSigner: false,
        },
        {
          name: "nftCustody",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenAuthority",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "nftAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadataProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarInstructions",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authRules",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "authRulesProgram",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
      ],
      args: [],
    },
    {
      name: "unstakeCore",
      accounts: [
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftRecord",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "rewardMint",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "stakeTokenVault",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "rewardReceiveAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "nftMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collectionMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feesWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenAuthority",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "nftAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "coreProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "unstakeNifty",
      accounts: [
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeRecord",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftRecord",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "rewardMint",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "stakeTokenVault",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "rewardReceiveAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "nftMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collectionMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "feesWallet",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenAuthority",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "nftAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "niftyProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "extendEmission",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: false,
          isSigner: false,
        },
        {
          name: "emission",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "newEndingTime",
          type: "i64",
        },
      ],
    },
    {
      name: "addFunds",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "emission",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rewardMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeTokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "removeFunds",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "emission",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rewardMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakeTokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: {
            option: "u64",
          },
        },
      ],
    },
    {
      name: "changeReward",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: true,
          isSigner: false,
        },
        {
          name: "emission",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "newReward",
          type: "u64",
        },
      ],
    },
    {
      name: "close",
      accounts: [
        {
          name: "programConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateStakeSubscription",
      accounts: [
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "usdc",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "usdcAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "subscriptionUsdcAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "subscriptionWallet",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "program",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "programData",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
      ],
      args: [
        {
          name: "subscription",
          type: {
            defined: "Subscription",
          },
        },
      ],
    },
    {
      name: "updateStakeRemoveBranding",
      accounts: [
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "usdc",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "usdcAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "subscriptionUsdcAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "subscriptionWallet",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "program",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "programData",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
      ],
      args: [
        {
          name: "removeBranding",
          type: "bool",
        },
      ],
    },
    {
      name: "updateStakeOwnDomain",
      accounts: [
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "usdc",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "usdcAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "subscriptionUsdcAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "subscriptionWallet",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "program",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "programData",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
          isOptional: true,
        },
      ],
      args: [
        {
          name: "ownDomain",
          type: "string",
        },
      ],
    },
    {
      name: "updateStakeNextPaymentTime",
      docs: ["these are admin only functions"],
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "program",
          isMut: false,
          isSigner: false,
        },
        {
          name: "programData",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "nextPaymentTime",
          type: "i64",
        },
      ],
    },
    {
      name: "clearClugs",
      accounts: [
        {
          name: "programConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "program",
          isMut: false,
          isSigner: false,
        },
        {
          name: "programData",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "resize",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "program",
          isMut: false,
          isSigner: false,
        },
        {
          name: "programData",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "addToken",
      accounts: [
        {
          name: "staker",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenVault",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "tokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "tokenVault",
          type: "bool",
        },
      ],
    },
    {
      name: "initProgramConfig",
      accounts: [
        {
          name: "programConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "program",
          isMut: false,
          isSigner: false,
        },
        {
          name: "programData",
          isMut: false,
          isSigner: false,
        },
        {
          name: "subscriptionUsdcAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "subscriptionWallet",
          isMut: false,
          isSigner: false,
        },
        {
          name: "usdc",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "stakeFee",
          type: "u64",
        },
        {
          name: "unstakeFee",
          type: "u64",
        },
        {
          name: "claimFee",
          type: "u64",
        },
        {
          name: "advancedSubscriptionFee",
          type: "u64",
        },
        {
          name: "proSubscriptionFee",
          type: "u64",
        },
        {
          name: "ultimateSubscriptionFee",
          type: "u64",
        },
        {
          name: "extraCollectionFee",
          type: "u64",
        },
        {
          name: "removeBrandingFee",
          type: "u64",
        },
        {
          name: "ownDomainFee",
          type: "u64",
        },
      ],
    },
    {
      name: "updateProgramConfig",
      accounts: [
        {
          name: "programConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "program",
          isMut: false,
          isSigner: false,
        },
        {
          name: "programData",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "stakeFee",
          type: {
            option: "u64",
          },
        },
        {
          name: "unstakeFee",
          type: {
            option: "u64",
          },
        },
        {
          name: "claimFee",
          type: {
            option: "u64",
          },
        },
        {
          name: "advancedSubscriptionFee",
          type: {
            option: "u64",
          },
        },
        {
          name: "proSubscriptionFee",
          type: {
            option: "u64",
          },
        },
        {
          name: "ultimateSubscriptionFee",
          type: {
            option: "u64",
          },
        },
        {
          name: "extraCollectionFee",
          type: {
            option: "u64",
          },
        },
        {
          name: "removeBrandingFee",
          type: {
            option: "u64",
          },
        },
        {
          name: "ownDomainFee",
          type: {
            option: "u64",
          },
        },
      ],
    },
    {
      name: "patchWeight",
      accounts: [
        {
          name: "staker",
          isMut: false,
          isSigner: false,
        },
        {
          name: "collection",
          isMut: false,
          isSigner: false,
        },
        {
          name: "emission",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "weight",
          type: "u128",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "collection",
      type: {
        kind: "struct",
        fields: [
          {
            name: "staker",
            docs: ["staker this collection belongs to (32)"],
            type: "publicKey",
          },
          {
            name: "collectionMint",
            docs: ["MCC mint of the collection (32)"],
            type: "publicKey",
          },
          {
            name: "creators",
            docs: ["optional creators (4)"],
            type: {
              vec: "publicKey",
            },
          },
          {
            name: "custodial",
            docs: ["Collection custody type (1)"],
            type: "bool",
          },
          {
            name: "allowList",
            docs: ["Merkle root of allowlist (1 + 32)"],
            type: {
              option: "publicKey",
            },
          },
          {
            name: "tokenEmission",
            docs: ["pubkey of token emission config (1 + 32)"],
            type: {
              option: "publicKey",
            },
          },
          {
            name: "selectionEmission",
            docs: ["pubkey of selection emission config (1 + 32)"],
            type: {
              option: "publicKey",
            },
          },
          {
            name: "pointsEmission",
            docs: ["pubkey of points emission config (1 + 32)"],
            type: {
              option: "publicKey",
            },
          },
          {
            name: "distributionEmission",
            docs: ["pubkey of distribution emission config (1 + 32)"],
            type: {
              option: "publicKey",
            },
          },
          {
            name: "isActive",
            docs: ["items can be staked, rewards accrue (1)"],
            type: "bool",
          },
          {
            name: "maxStakersCount",
            docs: ["The max number of NFTs that can be staked (8)"],
            type: "u64",
          },
          {
            name: "currentStakersCount",
            docs: ["The current number of NFTs staked (8)"],
            type: "u64",
          },
          {
            name: "bump",
            docs: ["Bump of the Collection PDA (1)"],
            type: "u8",
          },
        ],
      },
    },
    {
      name: "distribution",
      type: {
        kind: "struct",
        fields: [
          {
            name: "staker",
            docs: ["staker this distribution belongs to (32)"],
            type: "publicKey",
          },
          {
            name: "label",
            docs: ["descriptor (4 + 20)"],
            type: "string",
          },
          {
            name: "tokenMint",
            docs: ["token mint, if not sol"],
            type: {
              option: "publicKey",
            },
          },
          {
            name: "uri",
            docs: ["uri link to offchain distribution log (4 + 63)"],
            type: "string",
          },
          {
            name: "totalAmount",
            docs: ["total amount of this distribution (8)"],
            type: "u64",
          },
          {
            name: "balance",
            docs: ["current balance of this distribution (8)"],
            type: "u64",
          },
          {
            name: "numShares",
            docs: ["total number of shares (4)"],
            type: "u32",
          },
          {
            name: "sharesFunded",
            docs: ["number of funded shares (4)"],
            type: "u32",
          },
          {
            name: "createdAt",
            docs: ["timestamp (8)"],
            type: "i64",
          },
          {
            name: "claimedAmount",
            docs: ["amount claimed (8)"],
            type: "u64",
          },
          {
            name: "complete",
            docs: ["have all shares been assigned? (1)"],
            type: "bool",
          },
          {
            name: "active",
            docs: ["can users claim? (1)"],
            type: "bool",
          },
          {
            name: "vaultAuthorityBump",
            docs: ["bump of the vault authority (1)"],
            type: "u8",
          },
        ],
      },
    },
    {
      name: "emission",
      type: {
        kind: "struct",
        fields: [
          {
            name: "collection",
            docs: ["the collection the emission belongs to (32)"],
            type: "publicKey",
          },
          {
            name: "merkleRoot",
            docs: ["the root hash (1 + 32),"],
            type: {
              option: "publicKey",
            },
          },
          {
            name: "rewardType",
            docs: ["The type of emission (1 + 32 + 1)"],
            type: {
              defined: "RewardType",
            },
          },
          {
            name: "reward",
            docs: ["The record of the current and the previous reward emissions (4 + 8)"],
            type: {
              vec: "u64",
            },
          },
          {
            name: "rewardChangeTime",
            docs: ["The record of the time when the emission changed (4 + 8)"],
            type: {
              vec: "i64",
            },
          },
          {
            name: "startTime",
            docs: ["Starting time of the staking (8)"],
            type: "i64",
          },
          {
            name: "tokenMint",
            docs: ["optional token mint (1 + 32)"],
            type: {
              option: "publicKey",
            },
          },
          {
            name: "tokenVault",
            docs: ["is token vault (1)"],
            type: "bool",
          },
          {
            name: "endTime",
            docs: ["The period for which the staking is funded (1 + 8)"],
            type: {
              option: "i64",
            },
          },
          {
            name: "stakedWeight",
            docs: ["Accrued weight of the staked NFTs (16)"],
            type: "u128",
          },
          {
            name: "currentBalance",
            docs: ["the current balance for this emission (8)"],
            type: "u64",
          },
          {
            name: "minimumPeriod",
            docs: ["The minimum stake period to be eligible for reward in seconds (1 + 8)"],
            type: {
              option: "i64",
            },
          },
          {
            name: "stakedItems",
            docs: ["number of staked items using this emission (8)"],
            type: "u64",
          },
          {
            name: "active",
            docs: ["is the emission active (1)"],
            type: "bool",
          },
        ],
      },
    },
    {
      name: "nftRecord",
      type: {
        kind: "struct",
        fields: [
          {
            name: "nftMint",
            docs: ["nft_mint public key (32)"],
            type: "publicKey",
          },
          {
            name: "points",
            docs: ["persistant points (8)"],
            type: "u64",
          },
          {
            name: "bump",
            docs: ["Bump of the NFT Record PDA (1)"],
            type: "u8",
          },
        ],
      },
    },
    {
      name: "programConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "stakeFee",
            docs: ["tx fee for staking (8)"],
            type: "u64",
          },
          {
            name: "unstakeFee",
            docs: ["tx fee for unstaking (8)"],
            type: "u64",
          },
          {
            name: "claimFee",
            docs: ["tx fee for claiming (8)"],
            type: "u64",
          },
          {
            name: "advancedSubscriptionFee",
            docs: ["monthly fee for advanced (8)"],
            type: "u64",
          },
          {
            name: "proSubscriptionFee",
            docs: ["monthly fee for pro (8)"],
            type: "u64",
          },
          {
            name: "ultimateSubscriptionFee",
            docs: ["monthly fee for ultimate (8)"],
            type: "u64",
          },
          {
            name: "extraCollectionFee",
            docs: ["monthly fee for additional collections (8)"],
            type: "u64",
          },
          {
            name: "removeBrandingFee",
            docs: ["monthly fee for removing branding (8)"],
            type: "u64",
          },
          {
            name: "ownDomainFee",
            docs: ["monthly fee for own domain (8)"],
            type: "u64",
          },
          {
            name: "slugs",
            docs: ["a vector storing all slugs (4)"],
            type: {
              vec: "string",
            },
          },
          {
            name: "bump",
            docs: ["bump for the program config account (1)"],
            type: "u8",
          },
        ],
      },
    },
    {
      name: "shareRecord",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            docs: ["owner of the share record (32)"],
            type: "publicKey",
          },
          {
            name: "distribution",
            docs: ["distribution this record belongs to (32)"],
            type: "publicKey",
          },
          {
            name: "amount",
            docs: ["amount in basis points (8)"],
            type: "u64",
          },
          {
            name: "numItems",
            docs: ["number of items (4)"],
            type: "u32",
          },
          {
            name: "bump",
            docs: ["bump of the share_record account (1)"],
            type: "u8",
          },
        ],
      },
    },
    {
      name: "stakeRecord",
      type: {
        kind: "struct",
        fields: [
          {
            name: "staker",
            docs: ["staker that this record belongs to (32)"],
            type: "publicKey",
          },
          {
            name: "owner",
            docs: ["owner of the NFT 32"],
            type: "publicKey",
          },
          {
            name: "nftMint",
            docs: ["mint of the staked NFT (32)"],
            type: "publicKey",
          },
          {
            name: "emissions",
            docs: ["emissions (4 + 32 * 4),"],
            type: {
              vec: "publicKey",
            },
          },
          {
            name: "pendingClaim",
            docs: ["pending token balance to claim (8)"],
            type: "u64",
          },
          {
            name: "canClaimAt",
            docs: ["timestamp of when can claim (8)"],
            type: "i64",
          },
          {
            name: "solBalance",
            docs: ["sol balance to claim (8)"],
            type: "u64",
          },
          {
            name: "stakedAt",
            docs: ["Staking timestamp (8)"],
            type: "i64",
          },
          {
            name: "bump",
            docs: ["Bump of the Stake Record PDA (1)"],
            type: "u8",
          },
        ],
      },
    },
    {
      name: "staker",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            docs: ["The authority of the staker (32)"],
            type: "publicKey",
          },
          {
            name: "slug",
            docs: ["slug, max 50 chars (50 + 4)"],
            type: "string",
          },
          {
            name: "name",
            docs: ["name of the project, max 50 chars (50 + 4)"],
            type: "string",
          },
          {
            name: "customDomain",
            docs: ["optional custom domain, max 50 chars (1 + 4 + 50),"],
            type: {
              option: "string",
            },
          },
          {
            name: "theme",
            docs: ["Active theme struct"],
            type: {
              defined: "Theme",
            },
          },
          {
            name: "isActive",
            docs: ["Staker status (1)"],
            type: "bool",
          },
          {
            name: "removeBranding",
            docs: ["Branding removed (1)"],
            type: "bool",
          },
          {
            name: "ownDomain",
            docs: ["Branding removed (1)"],
            type: "bool",
          },
          {
            name: "subscription",
            docs: ["Subscription level (1 + 32)"],
            type: {
              defined: "Subscription",
            },
          },
          {
            name: "prevSubscription",
            docs: ["Subscription level (1 + 32)"],
            type: {
              defined: "Subscription",
            },
          },
          {
            name: "subscriptionLiveDate",
            docs: ["Date the subscription will become live (8)"],
            type: "i64",
          },
          {
            name: "collections",
            type: {
              vec: "publicKey",
            },
          },
          {
            name: "tokenAuthBump",
            docs: ["The bump of the token authority PDA (1)"],
            type: "u8",
          },
          {
            name: "nftAuthBump",
            docs: ["The bump of the NFT authority PDA (1)"],
            type: "u8",
          },
          {
            name: "startDate",
            docs: ["staking start time  (8)"],
            type: "i64",
          },
          {
            name: "tokenMint",
            docs: ["optional token mint with mint auth (1 + 32)"],
            type: {
              option: "publicKey",
            },
          },
          {
            name: "tokenVault",
            docs: ["use a token vault (1)"],
            type: "bool",
          },
          {
            name: "nextPaymentTime",
            docs: ["timestamp the next payment is due  (8)"],
            type: "i64",
          },
          {
            name: "numberStaked",
            docs: ["number of staked items (4)"],
            type: "u32",
          },
        ],
      },
    },
    {
      name: "userRecord",
      type: {
        kind: "struct",
        fields: [
          {
            name: "itemsStaked",
            type: "u32",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "Choice",
      type: {
        kind: "struct",
        fields: [
          {
            name: "reward",
            docs: ["reward per second"],
            type: "u64",
          },
          {
            name: "duration",
            docs: ["time in seconds"],
            type: "i64",
          },
          {
            name: "lock",
            docs: ["whether to enforce min term"],
            type: "bool",
          },
        ],
      },
    },
    {
      name: "FontStyles",
      type: {
        kind: "struct",
        fields: [
          {
            name: "fontFamily",
            docs: ["The font family (1)"],
            type: {
              defined: "FontFamily",
            },
          },
          {
            name: "bold",
            docs: ["bold or normal (1)"],
            type: "bool",
          },
          {
            name: "uppercase",
            docs: ["uppercase or normal (1)"],
            type: "bool",
          },
        ],
      },
    },
    {
      name: "Theme",
      type: {
        kind: "struct",
        fields: [
          {
            name: "logo",
            docs: ["Link to offchain logo (1 + 1)"],
            type: {
              option: "u8",
            },
          },
          {
            name: "background",
            docs: ["Link to offchain bg (1 + 1)"],
            type: "u8",
          },
          {
            name: "logos",
            docs: ["All uploaded logos (4)"],
            type: {
              vec: "string",
            },
          },
          {
            name: "backgrounds",
            docs: ["All uploaded bgs (4)"],
            type: {
              vec: "string",
            },
          },
          {
            name: "bodyFont",
            docs: ["Body font styles (3)"],
            type: {
              defined: "FontStyles",
            },
          },
          {
            name: "headerFont",
            docs: ["Header font styles (3)"],
            type: {
              defined: "FontStyles",
            },
          },
          {
            name: "primaryColor",
            docs: ["Hexadecimal (string) color (4 + 6)"],
            type: "string",
          },
          {
            name: "secondaryColor",
            docs: ["Hexadecimal (string) color (4 + 6)"],
            type: "string",
          },
          {
            name: "darkMode",
            docs: ["Whether dark mode is enabled (1)"],
            type: "bool",
          },
        ],
      },
    },
    {
      name: "RewardType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Token",
          },
          {
            name: "Selection",
            fields: [
              {
                name: "options",
                type: {
                  vec: {
                    defined: "Choice",
                  },
                },
              },
            ],
          },
          {
            name: "Points",
          },
          {
            name: "Distribution",
          },
        ],
      },
    },
    {
      name: "Subscription",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Penalty",
          },
          {
            name: "Free",
          },
          {
            name: "Advanced",
          },
          {
            name: "Pro",
          },
          {
            name: "Ultimate",
          },
          {
            name: "Custom",
            fields: [
              {
                name: "amount",
                type: "u64",
              },
              {
                name: "stakeFee",
                type: "u64",
              },
              {
                name: "unstakeFee",
                type: "u64",
              },
              {
                name: "claimFee",
                type: "u64",
              },
            ],
          },
        ],
      },
    },
    {
      name: "FontFamily",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Roboto",
          },
          {
            name: "OpenSans",
          },
          {
            name: "Montserrat",
          },
          {
            name: "Lato",
          },
          {
            name: "Poppins",
          },
          {
            name: "SourceSans3",
          },
          {
            name: "LeagueGothic",
          },
          {
            name: "Raleway",
          },
          {
            name: "NotoSans",
          },
          {
            name: "Inter",
          },
          {
            name: "RobotoSlab",
          },
          {
            name: "Merriweather",
          },
          {
            name: "PlayfairDisplay",
          },
          {
            name: "RobotoMono",
          },
          {
            name: "Quattrocento",
          },
          {
            name: "QuattrocentoSans",
          },
          {
            name: "Kanit",
          },
          {
            name: "Nunito",
          },
          {
            name: "WorkSans",
          },
        ],
      },
    },
    {
      name: "FeeType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Stake",
          },
          {
            name: "Unstake",
          },
          {
            name: "Claim",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "SlugTooLong",
      msg: "Slug must be max 50 chars",
    },
    {
      code: 6001,
      name: "SlugRequired",
      msg: "Slug must be provided",
    },
    {
      code: 6002,
      name: "NameTooLong",
      msg: "Name must be max 50 chars",
    },
    {
      code: 6003,
      name: "NameRequired",
      msg: "Name must be provided",
    },
    {
      code: 6004,
      name: "ProfanityDetected",
      msg: "Profanity cannot be used in a name",
    },
    {
      code: 6005,
      name: "SlugExists",
      msg: "Slug already exists - contact us if you think this is an error",
    },
    {
      code: 6006,
      name: "InsufficientBalanceInVault",
      msg: "insuficient balance for new staking duration, add funds before extending",
    },
    {
      code: 6007,
      name: "StakeOver",
      msg: "this STAKE is completed",
    },
    {
      code: 6008,
      name: "StakeNotLive",
      msg: "this STAKE is not yet live",
    },
    {
      code: 6009,
      name: "MaxStakersReached",
      msg: "max stakers have been reached",
    },
    {
      code: 6010,
      name: "StakeInactive",
      msg: "this staker is inactive",
    },
    {
      code: 6011,
      name: "CollectionInactive",
      msg: "this collection is inactive",
    },
    {
      code: 6012,
      name: "CollectionActive",
      msg: "this collection is still inactive",
    },
    {
      code: 6013,
      name: "InvalidCollection",
      msg: "nft is not included in the allowed collection",
    },
    {
      code: 6014,
      name: "CollectionNotVerified",
      msg: "collection must be verified",
    },
    {
      code: 6015,
      name: "TokenNotNFT",
      msg: "token is not an NFT",
    },
    {
      code: 6016,
      name: "NoRewardMint",
      msg: "no reward mint has been configured for this stake",
    },
    {
      code: 6017,
      name: "InvalidRewardToken",
      msg: "unexpected reward token",
    },
    {
      code: 6018,
      name: "UnexpectedRemainingAccounts",
      msg: "unexpected number of remaining accounts",
    },
    {
      code: 6019,
      name: "TokenAccountEmpty",
      msg: "token account must contain 1 token",
    },
    {
      code: 6020,
      name: "NegativePeriodValue",
      msg: "the minimum staking period in seconds can't be negative",
    },
    {
      code: 6021,
      name: "InvalidStakeEndTime",
      msg: "stake ends time must be greater than the current time and the start time",
    },
    {
      code: 6022,
      name: "StakeEndTimeRequired",
      msg: "Stake end time required if using a token vault",
    },
    {
      code: 6023,
      name: "StartTimeInPast",
      msg: "start time cannot be in the past",
    },
    {
      code: 6024,
      name: "TooManyStakers",
      msg: "max stakers can't be higher than the total collection size",
    },
    {
      code: 6025,
      name: "NotEnoughStakers",
      msg: "max stakers must be larger than 0",
    },
    {
      code: 6026,
      name: "FailedTimeConversion",
      msg: "failed to convert the time to i64",
    },
    {
      code: 6027,
      name: "StakeBumpError",
      msg: "unable to get stake details bump",
    },
    {
      code: 6028,
      name: "ProgramSubError",
      msg: "unable to subtract the given values",
    },
    {
      code: 6029,
      name: "ProgramMulError",
      msg: "unable to multiply the given values",
    },
    {
      code: 6030,
      name: "ProgramDivError",
      msg: "unable to divide the given values",
    },
    {
      code: 6031,
      name: "ProgramAddError",
      msg: "unable to add the given values",
    },
    {
      code: 6032,
      name: "MinimumPeriodNotReached",
      msg: "minimum staking period not reached",
    },
    {
      code: 6033,
      name: "InstructionBuilderFailed",
      msg: "failed to build instruction",
    },
    {
      code: 6034,
      name: "PaymentNotDueYet",
      msg: "payment isn't yet due",
    },
    {
      code: 6035,
      name: "NoPaymentDue",
      msg: "no payment due",
    },
    {
      code: 6036,
      name: "AdminOnly",
      msg: "only the system admin can use this instruction",
    },
    {
      code: 6037,
      name: "Unauthorized",
      msg: "the current signer doesn't have permission to perform this action",
    },
    {
      code: 6038,
      name: "MaxCollections",
      msg: "this STAKE has reached its maximum collections",
    },
    {
      code: 6039,
      name: "UpdateAuthRequired",
      msg: "update authority approval is required for minimum-term locking",
    },
    {
      code: 6040,
      name: "LockingPeriodTooLong",
      msg: "enforced locking period cannot be longer than 1 year",
    },
    {
      code: 6041,
      name: "LockingPeriodTooShort",
      msg: "enforced locking period must be longer than 1 second",
    },
    {
      code: 6042,
      name: "InvalidProgramData",
      msg: "an invalid programData account was provided",
    },
    {
      code: 6043,
      name: "StakeInArrears",
      msg: "addons cannot be added to a STAKE in arrears",
    },
    {
      code: 6044,
      name: "DurationRequired",
      msg: "duration is required if using a token vault",
    },
    {
      code: 6045,
      name: "DurationTooShort",
      msg: "duration must me more than 0",
    },
    {
      code: 6046,
      name: "CannotExtendNoEndDate",
      msg: "cannot extend as no end date set",
    },
    {
      code: 6047,
      name: "CollectionsMissing",
      msg: "all linked collections must be passed in remaining accounts",
    },
    {
      code: 6048,
      name: "EmissionsMissing",
      msg: "all emissions must be passed in remaining accounts",
    },
    {
      code: 6049,
      name: "NoTokensToClaim",
      msg: "There are no tokens to claim for this collection",
    },
    {
      code: 6050,
      name: "CollectionHasStakers",
      msg: "There are still active stakers who have yet to claim",
    },
    {
      code: 6051,
      name: "InvalidSlug",
      msg: "Slug must be a valid URL slug",
    },
    {
      code: 6052,
      name: "InvalidImage",
      msg: "Only accepts full arweave images",
    },
    {
      code: 6053,
      name: "ImageTooLong",
      msg: "Max 63 chars",
    },
    {
      code: 6054,
      name: "InvalidColor",
      msg: "Only hexadecimal colors are accepted - eg 0BFFD0",
    },
    {
      code: 6055,
      name: "StillHasCollections",
      msg: "Cannot close a staker that still has collections",
    },
    {
      code: 6056,
      name: "StillHasStakedItems",
      msg: "Cannot close a staker that still has staked items",
    },
    {
      code: 6057,
      name: "FrontLoadNotLocked",
      msg: "Tokens can only be front loaded with enforced minimum period emissions",
    },
    {
      code: 6058,
      name: "InvalidEmissions",
      msg: "Selected emission(s) do not exist",
    },
    {
      code: 6059,
      name: "InvalidEmissionPeriods",
      msg: "One or more selected emissions is not active",
    },
    {
      code: 6060,
      name: "NoEmissionsToAdd",
      msg: "At least one emission must be provided",
    },
    {
      code: 6061,
      name: "NoMinPeriodWithOption",
      msg: "Minimum period cannot by used with multiple option emissions",
    },
    {
      code: 6062,
      name: "RewardRequired",
      msg: "Reward required with this emission type",
    },
    {
      code: 6063,
      name: "InvalidEmission",
      msg: "Invalid emission",
    },
    {
      code: 6064,
      name: "EmissionSelectionRequired",
      msg: "A selection is required for this emission",
    },
    {
      code: 6065,
      name: "InvalidIndex",
      msg: "This index is invalid",
    },
    {
      code: 6066,
      name: "SelectionEmissionExists",
      msg: "Only one selection type emission can exist per collection",
    },
    {
      code: 6067,
      name: "StillHasEmissions",
      msg: "This collection still has active emissions",
    },
    {
      code: 6068,
      name: "NoAuthority",
      msg: "The program doesn't have mint auth for this token",
    },
    {
      code: 6069,
      name: "EmissionNotActive",
      msg: "This emission is not active",
    },
    {
      code: 6070,
      name: "TokenMintRequired",
      msg: "This emission type needs a token mint",
    },
    {
      code: 6071,
      name: "TokenExists",
      msg: "This collection already has a token",
    },
    {
      code: 6072,
      name: "TokenVaultRequired",
      msg: "Token vault address is required",
    },
    {
      code: 6073,
      name: "InvalidCreator",
      msg: "Invalid creator for NFT",
    },
    {
      code: 6074,
      name: "LabelTooLong",
      msg: "Label max length is 20 chars",
    },
    {
      code: 6075,
      name: "AmountTooLow",
      msg: "Amount must be greater than 0",
    },
    {
      code: 6076,
      name: "TotalSharesFunded",
      msg: "The total shares have already been funded for this distribution",
    },
    {
      code: 6077,
      name: "DistributionInactive",
      msg: "This distribution is inactive",
    },
    {
      code: 6078,
      name: "DistributionIncomplete",
      msg: "This distribution hasn't been completed yet",
    },
    {
      code: 6079,
      name: "InvalidInstruction",
      msg: "This instruction cannot be used for this asset type",
    },
    {
      code: 6080,
      name: "NonCustodialOnly",
      msg: "This asset type can only be staked non-custodially",
    },
  ],
}
