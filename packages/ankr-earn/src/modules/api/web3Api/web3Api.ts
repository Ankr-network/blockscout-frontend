import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CacheTags as StakeANKRCacheTags } from 'modules/stake-ankr/cacheTags';
import { CacheTags as StakeAVAXCacheTags } from 'modules/stake-avax/const';
import { CacheTags as StakeBNBCacheTags } from 'modules/stake-bnb/const';
import { CacheTags as StakeETHCacheTags } from 'modules/stake-eth/const';
import { CacheTags as StakeFTMCacheTags } from 'modules/stake-fantom/const';
import { CacheTags as StakeMaticOnEthCacheTags } from 'modules/stake-matic/eth/const';
import { CacheTags as StakeMaticOnPolygonCacheTags } from 'modules/stake-matic/polygon/const';
import { CacheTags as StakeXDCCacheTags } from 'modules/stake-xdc/const';

export const web3Api = createApi({
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: () => ({}),
  reducerPath: 'web3Api',
  tagTypes: [
    ...Object.values(StakeAVAXCacheTags),
    ...Object.values(StakeANKRCacheTags),
    ...Object.values(StakeBNBCacheTags),
    ...Object.values(StakeFTMCacheTags),
    ...Object.values(StakeXDCCacheTags),
    ...Object.values(StakeMaticOnPolygonCacheTags),
    ...Object.values(StakeMaticOnEthCacheTags),
    ...Object.values(StakeETHCacheTags),
  ],
});
