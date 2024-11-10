import { createSelector } from '@reduxjs/toolkit';

import { INJECTED_WALLET_ID } from 'modules/api/MultiService';
import { authConnect } from 'domains/auth/actions/connect';
import { authMakeAuthorization } from 'domains/auth/actions/connect/authMakeAuthorization';
import { selectIsLoggingInViaOauth } from 'domains/oauth/store/selectors';

export const selectIsConnecting = createSelector(
  authMakeAuthorization.select({ params: { walletId: INJECTED_WALLET_ID } }),
  authConnect.select({ params: { walletId: INJECTED_WALLET_ID } }),
  ({ isLoading: isMakingAuthorization }, { isLoading: isConnecting }) =>
    isMakingAuthorization || isConnecting,
);

export const selectIsAuthorizing = createSelector(
  selectIsLoggingInViaOauth,
  selectIsConnecting,
  (isLoggingInViaOauth, isConnecting) => isLoggingInViaOauth || isConnecting,
);
