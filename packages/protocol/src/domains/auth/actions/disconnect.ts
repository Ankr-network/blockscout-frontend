import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { topUpReset } from 'domains/account/actions/topUp/reset';
import { web3Api } from 'store/queries';

export const {
  useLazyAuthDisconnectQuery,
  endpoints: { authDisconnect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authDisconnect: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_args, { dispatch }) => {
        dispatch(setAuthData({ isManualDisconnected: true }));

        dispatch(resetAuthData());

        dispatch(topUpReset.initiate());

        resetEndpoint('authConnect', dispatch);
        resetEndpoint('chainsFetchPremiumChainFeatures', dispatch);
        resetEndpoint('infrastructureFetchProvider', dispatch);
        resetEndpoint('accountFetchAccountBalance', dispatch);

        return { data: true };
      }),
    }),
  }),
});
