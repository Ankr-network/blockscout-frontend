import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetAuthData } from 'domains/auth/store/authSlice';
import { trackSignOut } from 'modules/analytics/mixpanel/trackSignOut';
import { web3Api, projectApi } from 'store/queries';
import { resetWalleState } from 'domains/wallet/store/walletSlice';

export const {
  endpoints: { authDisconnect },
  useLazyAuthDisconnectQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authDisconnect: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_args, { dispatch }) => {
        dispatch(resetAuthData());
        dispatch(resetWalleState());

        dispatch(web3Api.util.resetApiState());
        dispatch(projectApi.util.resetApiState());

        trackSignOut();

        return { data: true };
      }),
    }),
  }),
});
