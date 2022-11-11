import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { CacheTags as StakeAnkrCacheTags } from 'modules/stake-ankr/cacheTags';

export const web3Api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  reducerPath: 'web3Api',
  refetchOnMountOrArgChange: true,
  tagTypes: [...Object.values(StakeAnkrCacheTags)],
});
