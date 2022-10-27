import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CacheTags as StakeAnkrCacheTags } from '../stake-ankr/cacheTags';

export const web3Api = createApi({
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: () => ({}),
  reducerPath: 'web3Api',
  tagTypes: [...Object.values(StakeAnkrCacheTags)],
});
