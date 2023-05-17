# ankr-protocol-web

## How to add new chain

### any new chain
- add icon packages/protocol/src/uiKit/utils/getTokenIcon/index.ts
- add chainId to group packages/protocol/src/modules/endpoints/constants/groups.ts
- check existed group with similar functionality packages/protocol/src/modules/endpoints/constants/groups.ts
- or add new group if this is a chain with new logic
- check metatags packages/protocol/src/uiKit/utils/useMetatags.ts

### evm compatible
- add chainId to evm chainGroups standard-evm packages/protocol/src/modules/endpoints/constants/groups.ts
- check network config here: https://chainlist.org/
- add metamask config packages/protocol/src/domains/auth/components/AddNetwork/const.ts

### chain without mainnet (testnet, devnet, etc)
- add mainnet chain id to packages/protocol/src/domains/chains/utils/isTestnetOnlyChain.ts

### beacon or opnode
- add chainId to config: packages/protocol/src/modules/chains/utils/isBeacon.ts

### endpoints
- check that public and private urls are correct and add logic to packages/multirpc-sdk/src/sdk/buildUrls

### release:
- release new chain on the prod
- ask backend to add new chain to the prod db
- rebuild prod again to generate new static page, when you will see new chain on the prod
