import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CacheTags as StakeANKRCacheTags } from 'modules/stake-ankr/cacheTags';
import { CacheTags as StakeFTMCacheTags } from 'modules/stake-fantom/const';

export const web3Api = createApi({
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: () => ({}),
  reducerPath: 'web3Api',
  tagTypes: [
    ...Object.values(StakeANKRCacheTags),
    ...Object.values(StakeFTMCacheTags),
  ],
});
