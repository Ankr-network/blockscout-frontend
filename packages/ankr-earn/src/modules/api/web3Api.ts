import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { CacheTags as StakeAnkrCacheTags } from '../stake-ankr/cacheTags';

export const web3Api = createApi({
  refetchOnMountOrArgChange: true,
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  reducerPath: 'web3Api',
  tagTypes: [...Object.values(StakeAnkrCacheTags)],
});
