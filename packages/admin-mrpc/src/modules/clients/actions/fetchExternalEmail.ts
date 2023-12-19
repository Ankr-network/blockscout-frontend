import { AuthCacheTags, web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { setAuthData } from 'modules/auth/store/authSlice';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export const {
  useFetchExternalEmailQuery,
  endpoints: { fetchExternalEmail },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchExternalEmail: build.query<string, void>({
      queryFn: async () => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const emailData = await backofficeGateway.getUsetEmail();

        return {
          data: emailData.external_email,
        };
      },
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        queryFulfilled.then(res => {
          if (res.data) {
            dispatch(
              setAuthData({
                email: res.data,
              }),
            );
            // const clearUrl = window.location.origin + window.location.pathname;

            // Clear query params
            // window.location.replace(clearUrl);
          }
        });
      },
      providesTags: [AuthCacheTags.emailData],
    }),
  }),
});
