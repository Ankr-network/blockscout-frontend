import { useCallback } from 'react';

import { INJECTED_WALLET_ID } from 'modules/api/MultiService';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { authConnect } from '../actions/connect';
import { authDisconnect } from '../actions/disconnect';
import { authMakeAuthorization } from '../actions/connect/authMakeAuthorization';
import { authConnectInitiator } from '../actions/connect/connectInitiator';

export const useWeb3Connection = () => {
  const [, { isLoading: isMakeAuthorizationLoading }] = useQueryEndpoint(
    authMakeAuthorization,
  );
  const [, { isLoading: isAuthConnectLoading }] = useQueryEndpoint(authConnect);

  const [connect, { isLoading: isConnectInitiatorLoading }] =
    useQueryEndpoint(authConnectInitiator);
  const [disconnect, { isLoading: isDisconnectLoading }] =
    useQueryEndpoint(authDisconnect);

  const handleConnect = useCallback(
    async (walletId = INJECTED_WALLET_ID) => connect({ params: { walletId } }),
    [connect],
  );

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const loading =
    isAuthConnectLoading ||
    isMakeAuthorizationLoading ||
    isConnectInitiatorLoading ||
    isDisconnectLoading;

  return {
    handleConnect,
    handleDisconnect,
    loading,
  };
};
