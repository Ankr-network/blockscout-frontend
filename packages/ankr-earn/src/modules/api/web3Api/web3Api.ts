import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CacheTags as StakeANKRCacheTags } from 'modules/stake-ankr/cacheTags';
import { CacheTags as StakeBNBCacheTags } from 'modules/stake-bnb/const';
import { CacheTags as StakeFTMCacheTags } from 'modules/stake-fantom/const';
import { CacheTags as StakeXDCCacheTags } from 'modules/stake-xdc/const';

export const web3Api = createApi({
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: () => ({}),
  reducerPath: 'web3Api',
  tagTypes: [
    ...Object.values(StakeANKRCacheTags),
    ...Object.values(StakeBNBCacheTags),
    ...Object.values(StakeFTMCacheTags),
    ...Object.values(StakeXDCCacheTags),
  ],
});
