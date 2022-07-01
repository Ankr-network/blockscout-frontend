# standalone-protocol

## Development
`$ yarn dev`

Use path `/chain/:chainId`

## Build
### Prod build with github actions
Set `$NAMES` var with needed chains in main.yml for ci/cd build or in `build-chains.sh` for local build
Start `$ yarn build-chains:prod`
Script will create `chains` folders with `chainName` subfolders

### Prod is available on this domains (Standalone chains list)

moonbeam - https://moonbeam.public-rpc.com/
solana - https://solana.public-rpc.com/
near - https://near.public-rpc.com/
arbitrum - https://arbitrum.public-rpc.com/
iotex - https://iotex.public-rpc.com/
avalanche - https://avalanche.public-rpc.com/
nervos - https://nervos.public-rpc.com/
erigonbsc - https://erigonbsc.public-rpc.com/, https://bscrpc.com/erigonbsc

### Legacy multi-rpc (not in this repo)
bsc - https://bscrpc.com/
polygon - https://rpc.ankr.com/polygon
fantom - https://rpc.ankr.com/fantom

## Stage build
Start `$ yarn build:stage`

with github actions use bs-5 env

### Stage is available here: https://bs-5-stage.dccn.ankr.com/chain/:chainId
