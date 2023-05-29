import { EWalletId, getWalletName } from '@ankr.com/provider';

import { AuthConnectParams } from './types';
import { RootState } from 'store';
import { IAuthSlice, resetAuthData, setAuthData } from '../../store/authSlice';
import { MultiService } from 'modules/api/MultiService';
import { disconnectService } from './connectUtils';
import { makeAuthorization } from './makeAuthorization';
import { is2FAError } from 'store/utils/is2FAError';
import { selectHasPremium } from 'domains/auth/store/selectors';
import { trackWeb3SignUpFailure } from 'modules/analytics/mixpanel/trackWeb3SignUpFailure';
import { trackWeb3SignUpSuccess } from 'modules/analytics/mixpanel/trackWeb3SignUpSuccess';
import { web3Api } from 'store/queries';
import { authConnect } from './connect';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

export const {
  endpoints: { authMakeAuthorization },
  useLazyAuthMakeAuthorizationQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authMakeAuthorization: build.query<IAuthSlice, AuthConnectParams>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async (
          { params: { walletId }, totp },
          { dispatch, getState },
        ) => {
          const web3Service = await MultiService.getWeb3Service();

          const service = MultiService.getService();

          const {
            data: { cachedData, hasWeb3Connection, hasOauthLogin } = {},
          } = authConnect.select(undefined as any)(getState() as RootState);

          if (hasWeb3Connection) {
            dispatch(setAuthData({ hasWeb3Autoconnect: true }));

            return { data: cachedData };
          }

          const authData = await makeAuthorization(
            web3Service,
            service,
            dispatch,
            walletId as EWalletId,
            hasOauthLogin,
            totp,
          );

          const { address, trackingWalletName: walletName } = authData;

          const hasPremium = selectHasPremium(getState() as RootState);

          trackWeb3SignUpSuccess({
            address,
            hasPremium,
            walletName: walletName!,
          });

          return { data: authData };
        },
        errorHandler: error => {
          return {
            error,
          };
        },
      }),
      onQueryStarted: async (
        { params: { walletId } },
        { dispatch, queryFulfilled },
      ) => {
        try {
          await queryFulfilled;
        } catch (errorData: any) {
          const isTwoFAError =
            is2FAError(errorData) || is2FAError(errorData?.error);

          if (!isTwoFAError) {
            trackWeb3SignUpFailure({
              walletName: getWalletName(walletId as EWalletId),
            });

            disconnectService();

            dispatch(
              NotificationActions.showNotification({
                message: errorData?.error?.message,
                severity: 'error',
              }),
            );

            dispatch(resetAuthData());
          }
        }
      },
    }),
  }),
});
