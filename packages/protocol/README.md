# Introduction

## Project Overview

Ankr's web3 API Application (https://www.ankr.com/rpc/)

# Getting Started

## Prerequisites
  * [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script)

## Installation

### Installing Node.js

```bash
cd packages/protocol && nvm install --default
```

### Installing yarn

```bash
npm install --global yarn
```

### Installing dependencies
```bash
yarn workspace @ankr.com/Web3APIApplication install
```

# Usage

## Starting the Application

```bash
yarn workspace @ankr.com/Web3APIApplication start:stage:turbo
```

# Development

## RTK Query usage

The response of the request sent to the backend using RTK Query library will be cached.
This means that once the request is sent, it will not be resent automatically.
If there is a need to re-request the data, you should use the options:
- `refetchOnMountOrArgChange: true` in the `useQuery` hook
- `forceRefetch: true` in the `initiate` method

## Adding a new chain

### Any new chain
- add chainId to packages/chains-list/src/types.ts
- add icon packages/protocol/src/uiKit/utils/getTokenIcon/index.ts
- add chainId to group packages/protocol/src/modules/endpoints/constants/groups.ts
- check existed group with similar functionality packages/protocol/src/modules/endpoints/constants/groups.ts
- or add new group if this is a chain with new logic
- check metatags packages/protocol/src/uiKit/utils/useMetatags.ts

### EVM compatible
- add chainId to evm chainGroups standard-evm packages/protocol/src/modules/endpoints/constants/groups.ts
- check network config here: https://chainlist.org/
- add metamask config packages/protocol/src/domains/auth/components/AddNetwork/const.ts

### Chain without mainnet (testnet, devnet, etc)
- add mainnet chain id to packages/protocol/src/domains/chains/utils/isTestnetOnlyChain.ts
- add mainnet chain id to packages/protocol/src/modules/chains/constants/index.ts

### Beacon or opnode
- add chainId to config: packages/protocol/src/modules/chains/utils/isBeacon.ts

### Endpoints
- check that public and private urls are correct and add logic to packages/multirpc-sdk/src/sdk/buildUrls

### Release:
- release new chain on the prod
- ask backend to add new chain to the prod db
- rebuild prod again to generate new static page, when you will see new chain on the prod
