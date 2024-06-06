import { EWalletId, getWalletName } from '@ankr.com/provider';
import { push } from 'connected-react-router';
import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { RootState } from 'store';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { is2FAError } from 'store/utils/is2FAError';
import { isEmptyEthAddressAuthError } from 'store/utils/isEmptyEthAddressAuthError';
import { selectCanContinueTeamCreationFlow } from 'modules/groups/store/selectors';
import { selectHasPremium } from 'domains/auth/store/selectors';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';
import { setGithubLoginNameAndEmail } from 'domains/oauth/actions/setGithubLoginNameAndEmail';
import { trackWeb3SignUpFailure } from 'modules/analytics/mixpanel/trackWeb3SignUpFailure';
import { trackWeb3SignUpSuccess } from 'modules/analytics/mixpanel/trackWeb3SignUpSuccess';
import { web3Api } from 'store/queries';

import { AuthConnectParams } from './types';
import { IAuthSlice, resetAuthData, setAuthData } from '../../store/authSlice';
import { authConnect } from './connect';
import { disconnectService } from './connectUtils';
import { getLocationToRedirectAfterConnect } from '../utils/getLocationToRedirectAfterConnect';
import { makeAuthorization } from './makeAuthorization';

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
          const web3Service = MultiService.getWeb3Service();

          const service = MultiService.getService();

          const {
            data: { cachedAuthData, hasOauthLogin, hasWeb3Connection } = {},
          } = authConnect.select(undefined as never)(getState() as RootState);

          if (hasWeb3Connection) {
            dispatch(setAuthData({ hasWeb3Autoconnect: true }));

            return { data: cachedAuthData };
          }

          if (web3Service) {
            const { authData } = await makeAuthorization({
              web3Service,
              service,
              dispatch,
              walletId: walletId as EWalletId,
              hasOauthLogin,
              totp,
            });

            const { authAddress, trackingWalletName: walletName } = authData;

            const hasPremium = selectHasPremium(getState() as RootState);

            trackWeb3SignUpSuccess({
              address: authAddress,
              hasPremium,
              walletName: walletName!,
            });

            return { data: authData };
          }

          return { data: cachedAuthData };
        },
        errorHandler: error => {
          return {
            error,
          };
        },
      }),
      onQueryStarted: async (
        { params: { walletId } },
        { dispatch, getState, queryFulfilled },
      ) => {
        try {
          await queryFulfilled;

          await dispatch(setGithubLoginNameAndEmail.initiate());
          const state = getState() as RootState;

          const { selectedGroupRole } = selectUserGroupConfigByAddress(state);

          const canContinueTeamCreationFlow =
            selectCanContinueTeamCreationFlow(state);

          const redirectTo = getLocationToRedirectAfterConnect({
            selectedGroupRole,
            canContinueTeamCreationFlow,
          });

          dispatch(push(redirectTo));
        } catch (errorData: any) {
          const isTwoFAError =
            is2FAError(errorData) || is2FAError(errorData?.error);

          if (!isTwoFAError) {
            trackWeb3SignUpFailure({
              walletName: getWalletName(walletId as EWalletId),
            });

            disconnectService();

            const message = isEmptyEthAddressAuthError(errorData?.error)
              ? t('error.empty-eth')
              : errorData?.error?.message;

            dispatch(
              NotificationActions.showNotification({
                message,
                severity: 'error',
                autoHideDuration: null,
              }),
            );

            dispatch(resetAuthData());
          }
        }
      },
    }),
  }),
});
