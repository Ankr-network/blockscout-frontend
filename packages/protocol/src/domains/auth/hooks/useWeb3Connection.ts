import { useCallback } from 'react';

import { authConnect } from '../actions/connect';
import { INJECTED_WALLET_ID } from 'modules/api/MultiService';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { authDisconnect } from '../actions/disconnect';
import { authMakeAuthorization } from '../actions/connect/authMakeAuthorization';
import { authConnectInitiator } from '../actions/connect/connectInitiator';
import { authAutoConnect } from '../actions/connect/authAutoConnect';

export const useWeb3Connection = () => {
  const [web3AutoConnect] = useQueryEndpoint(authAutoConnect);

  const [connect] = useQueryEndpoint(authConnectInitiator);
  const [, { isLoading: isConnecting }] = useQueryEndpoint(
    authMakeAuthorization,
  );
  const [, { isLoading }] = useQueryEndpoint(authConnect);
  const [, { isLoading: isAuthConnectLoading }] =
    useQueryEndpoint(authAutoConnect);
  const [disconnect, { isLoading: isDisconnecting }] =
    useQueryEndpoint(authDisconnect);

  const handleConnect = useCallback(
    async (walletId = INJECTED_WALLET_ID) => {
      return connect({ params: { walletId } });
    },
    [connect],
  );

  const handleAutoconnect = useCallback(
    (walletId = INJECTED_WALLET_ID) => {
      return web3AutoConnect({ params: { walletId } });
    },
    [web3AutoConnect],
  );

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return {
    handleConnect,
    handleAutoconnect,
    handleDisconnect,
    loading:
      isConnecting || isAuthConnectLoading || isLoading || isDisconnecting,
  };
};
