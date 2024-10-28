import { SerializeQueryArgs } from '@reduxjs/toolkit/dist/query/defaultSerializeQueryArgs';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { ESeconds } from 'modules/common/constants/const';

export enum RequestType {
  'BindingAccounts' = 'BindingAccounts',
  'GroupCreationAllowance' = 'GroupCreationAllowance',
  'MyBundles' = 'MyBundles',
  'MySubscriptions' = 'MySubscriptions',
  'ProjectWhitelist' = 'ProjectWhitelist',
  'ReferralCodes' = 'ReferralCodes',
  'RewardBalance' = 'RewardBalance',
  'RewardTxs' = 'RewardTxs',
  'UserGroupDetails' = 'UserGroupDetails',
  'UserGroupsList' = 'UserGroupsList',
  'WhitelistBlockchains' = 'WhitelistBlockchains',
  'WhitelistsBlockchains' = 'WhitelistsBlockchains',
}

// Endponts that must be cached by their names and params should be listed here
// Please keep in mind that if the name of an endpoint has changed,
// this list should also be updated
const endpointsSerializedByParams = [
  'checkDealDeposit',
  'checkPAYGDeposit',
  'estimateAllowanceFeeAnkr',
  'estimateAllowanceFeeUsdc',
  'estimateAllowanceFeeUsdt',
  'estimateDepositFeeAnkr',
  'estimateDepositFeeUsdc',
  'estimateDepositFeeUsdt',
  'fetchAllowanceAnkr',
  'fetchAllowanceUsdc',
  'fetchAllowanceUsdt',
  'fetchAllowedJWTsCount',
  'fetchBlockchainTxData',
  'fetchBlockchainTxReceipt',
  'fetchJWTStatus',
  'fetchJWTs',
  'fetchJWTsStatuses',
  'fetchNativeTokenPrice',
  'fetchPremiumStatus',
  'fetchProjectTotalRequests',
  'fetchProjectWhitelist',
  'fetchProjectWhitelistBlockchains',
  'fetchProjectsTotalRequests',
  'fetchProjectsWhitelists',
  'fetchProjectsWhitelistsBlockchains',
  'fetchReferralCodes',
  'fetchReferralLinksByCodes',
  'fetchReferralsCount',
  'fetchReferrer',
  'fetchRewardBalance',
  'fetchRewardTxs',
  'fetchTokenPrice',
  'fetchWalletBalanceAnkr',
  'fetchWalletBalanceUsdc',
  'fetchWalletBalanceUsdt',
  /* stats */
  'fetchChainTimeframeData',
  'fetchPrivateStats',
  'fetchProjectChainsStatsFor1h',
  'fetchProjectChainsStatsFor24h',
  'fetchProjectTotalRequestsForLastTwoDays',
  'fetchProjectTotalRequestsForLastTwoHours',
  'fetchPublicRequestsCountStats',
  'fetchTop10Stats',
];

const sortQueryArgsKeys = (queryArgs: unknown) => {
  if (queryArgs && typeof queryArgs === 'object') {
    // to make sure that a cache key doesn't depend on the query args keys order
    return Object.fromEntries(Object.entries(queryArgs).sort());
  }

  return queryArgs;
};

const serializeQueryArgs: SerializeQueryArgs<unknown> = ({
  endpointName,
  queryArgs,
}) => {
  if (endpointsSerializedByParams.includes(endpointName)) {
    const sortedArgs = sortQueryArgsKeys(queryArgs);

    return JSON.stringify({ queryArgs: sortedArgs }) + endpointName;
  }

  return endpointName;
};

export const web3Api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  // To keep endpont data after all subscribed to the endpoint components
  // are unmounted. Needs to reduce amount of requests
  keepUnusedDataFor: ESeconds.Minute,
  // To not refetch data automatically. Needs to reduce amount of requests
  refetchOnMountOrArgChange: false,
  serializeQueryArgs,
  tagTypes: [...Object.values(RequestType)],
});

export const projectApi = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'projectApi',
  endpoints: () => ({}),
  keepUnusedDataFor: ESeconds.Minute,
  refetchOnMountOrArgChange: false,
  // needs to cache data by endpoint name only without params
  serializeQueryArgs: ({ endpointName }) => endpointName,
  tagTypes: [],
});
