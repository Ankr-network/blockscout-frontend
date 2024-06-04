import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export enum RequestType {
  'BindingAccounts' = 'BindingAccounts',
  'GroupCreationAllowance' = 'GroupCreationAllowance',
  'MyBundles' = 'MyBundles',
  'MySubscriptions' = 'MySubscriptions',
  'ProjectWhitelist' = 'ProjectWhitelist',
  'UserGroupDetails' = 'UserGroupDetails',
  'UserGroupsList' = 'UserGroupsList',
  'WhitelistBlockchains' = 'WhitelistBlockchains',
}

// Endponts that must be cached by their names and params should be listed here
// Please keep in mind that if the name of an endpoint has changed,
// this list should also be updated
const endpointsSerializedByParams = [
  'estimateAllowanceFeeAnkr',
  'estimateAllowanceFeeUsdc',
  'estimateAllowanceFeeUsdt',
  'estimateDepositFeeAnkr',
  'estimateDepositFeeUsdc',
  'estimateDepositFeeUsdt',
  'fetchAllowanceUsdc',
  'fetchAllowanceUsdt',
  'fetchBlockchainTxData',
  'fetchBlockchainTxReceipt',
  'fetchNativeTokenPrice',
  'fetchTokenPrice',
  'fetchWalletBalanceUsdc',
  'fetchWalletBalanceUsdt',
];

export const web3Api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
  // needs to cache data by endpoint name only without params
  serializeQueryArgs: ({ endpointName, queryArgs }) =>
    endpointsSerializedByParams.includes(endpointName)
      ? JSON.stringify({ queryArgs }) + endpointName
      : endpointName,
  tagTypes: [...Object.values(RequestType)],
});

export const projectApi = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'projectApi',
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
  // needs to cache data by endpoint name only without params
  serializeQueryArgs: ({ endpointName }) => endpointName,
  tagTypes: [],
});
