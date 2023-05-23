import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetAuthData, selectAuthData } from 'domains/auth/store/authSlice';
import { trackSignOut } from 'modules/analytics/mixpanel/trackSignOut';
import { web3Api } from 'store/queries';
import { RootState } from 'store';
import {
  resetUserGroupConfig,
  resetUserGroupJwt,
} from 'domains/userGroup/store';

export const {
  useLazyAuthDisconnectQuery,
  endpoints: { authDisconnect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authDisconnect: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_args, { dispatch, getState }) => {
        const { address } = selectAuthData(getState() as RootState);
        dispatch(resetUserGroupConfig(address));
        dispatch(resetUserGroupJwt(address));

        dispatch(resetAuthData());

        dispatch(web3Api.util.resetApiState());

        trackSignOut();

        return { data: true };
      }),
    }),
  }),
});
