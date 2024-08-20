import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const AuthCacheTags = {
  emailData: 'emailData',
  twoFAData: 'twoFAData',
  referralCoderData: 'referralCoderData',
  userBundlesData: 'userBundlesData',
};

export const web3Api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
  // needs to cache data by endpoint name only without params
  serializeQueryArgs: ({ endpointName }) => endpointName,
  tagTypes: [...Object.values(AuthCacheTags)],
});
