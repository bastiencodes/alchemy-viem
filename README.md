# alchemy-viem

A rework of the [Alchemy SDK](https://github.com/alchemyplatform/alchemy-sdk-js) using [viem](https://viem.sh/) instead of [Ethers.js](https://docs.ethers.org/).

## Differences

- Uses [viem](https://viem.sh/) instead of [Ethers.js](https://docs.ethers.org/)

- `Network` enum changed

  - `MATIC_MAINNET` -> `POLYGON_MAINNET`
  - `MATIC_MUMBAI` -> `POLYGON_MUMBAI`

- `getTokenBalances` -> now available under alchemy

## TODOs

[] port core namespace
[] port nft namespace
[] port ws namespace
[] port transact namespace
[] port notify namespace
[] port debug namespace

[] make sdk multichain
[] add Solana
[] initialize multiple viem clients
