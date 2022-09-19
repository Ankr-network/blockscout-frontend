import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const web3Api = createApi({
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: () => ({}),
});
