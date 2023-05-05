# standalone-protocol

## Development
`$ yarn dev`

Use path `/chain/:chainId`

## How to add new chain
- Add chainid to ChainId enum
- Go to development mode by this url `/chain/:chainId`
- Add new theme to packages/standalone-protocol/src/modules/common/utils/getTheme.ts
- Add chain to CrossMenu
- Check metatags in useMetatags
- For EVM compatible chains add config to packages/standalone-protocol/src/modules/auth/components/AddNetwork/AddNetworkUtils.ts
- Add const to .github/workflows/standalone-protocol.yml to `NAMES` variable
- If it's a chain with relative path (like polygon/zkevm) update build-chains.sh


## Build
### Prod build with github actions
Set `$NAMES` var with needed chains in main.yml for ci/cd build or in `build-chains.sh` for local build
Start `$ yarn build-chains:prod`
Script will create `chains` folders with `chainName` subfolders


## Stage build
Start `$ yarn build:stage`

with github actions use bs-5 env

## Stage is available here: https://bs-1-stage.dccn.ankr.com/chain/:chainId
