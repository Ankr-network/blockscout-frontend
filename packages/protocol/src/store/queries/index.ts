import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const web3Api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
  // needs to cache data by endpoint name only without params
  serializeQueryArgs: ({ endpointName }) => endpointName,
  tagTypes: [
    'MyBundles',
    'MySubscriptions',
    'WhitelistBlockchains',
    'ProjectWhitelist',
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
