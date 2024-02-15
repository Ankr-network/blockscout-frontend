import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export enum RequestType {
  'MyBundles' = 'MyBundles',
  'MySubscriptions' = 'MySubscriptions',
  'WhitelistBlockchains' = 'WhitelistBlockchains',
  'ProjectWhitelist' = 'ProjectWhitelist',
  'UserGroupDetails' = 'UserGroupDetails',
  'UserGroupsList' = 'UserGroupsList',
  'GroupCreationAllowance' = 'GroupCreationAllowance',
  'BindingAccounts' = 'BindingAccounts',
}

export const web3Api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
  // needs to cache data by endpoint name only without params
  serializeQueryArgs: ({ endpointName }) => endpointName,
  tagTypes: [
    RequestType.MyBundles,
    RequestType.MySubscriptions,
    RequestType.WhitelistBlockchains,
    RequestType.ProjectWhitelist,
    RequestType.UserGroupDetails,
    RequestType.UserGroupsList,
    RequestType.GroupCreationAllowance,
    RequestType.BindingAccounts,
  ],
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
