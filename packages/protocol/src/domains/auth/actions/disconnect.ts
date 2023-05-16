import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetAuthData, selectAuthData } from 'domains/auth/store/authSlice';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { topUpReset } from 'domains/account/actions/topUp/reset';
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

        dispatch(topUpReset.initiate());

        resetEndpoint('authConnect', dispatch);
        resetEndpoint('authMakeAuthorization', dispatch);

        resetEndpoint('oauthLoginByGoogleSecretCode', dispatch);
        resetEndpoint('oauthLoginJwt', dispatch);

        resetEndpoint('chainsFetchPremiumChainFeatures', dispatch);
        resetEndpoint('infrastructureFetchProvider', dispatch);
        resetEndpoint('accountFetchAccountBalance', dispatch);
        resetEndpoint('fetchPremiumStatus', dispatch);
        resetEndpoint('userGroupFetchGroups', dispatch);
        resetEndpoint('shouldShowUserGroupDialog', dispatch);

        trackSignOut();

        return { data: true };
      }),
    }),
  }),
});
