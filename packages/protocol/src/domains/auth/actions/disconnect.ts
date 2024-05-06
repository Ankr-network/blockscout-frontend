import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetAuthData, selectAuthData } from 'domains/auth/store/authSlice';
import { trackSignOut } from 'modules/analytics/mixpanel/trackSignOut';
import { web3Api, projectApi } from 'store/queries';
import { RootState } from 'store';
import {
  resetUserGroupConfig,
  resetUserGroupJwt,
} from 'domains/userGroup/store';
import { resetWalleState } from 'domains/wallet/store/walletSlice';

export const {
  useLazyAuthDisconnectQuery,
  endpoints: { authDisconnect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authDisconnect: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_args, { dispatch, getState }) => {
        const { authAddress } = selectAuthData(getState() as RootState);

        dispatch(resetUserGroupConfig(authAddress));
        dispatch(resetUserGroupJwt(authAddress));

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
