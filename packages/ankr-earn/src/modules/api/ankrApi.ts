import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ANKR_API_CAHCE_TAG = 'ankr-api';

export const ankrApi = createApi({
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: () => ({}),
  reducerPath: 'ankrApi',
  tagTypes: [ANKR_API_CAHCE_TAG],
});
