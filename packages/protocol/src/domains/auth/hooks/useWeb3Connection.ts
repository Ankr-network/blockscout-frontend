import { useCallback } from 'react';

import { authConnect } from '../actions/connect';
import { INJECTED_WALLET_ID } from 'modules/api/MultiService';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { authDisconnect } from '../actions/disconnect';
import { authMakeAuthorization } from '../actions/connect/authMakeAuthorization';
import { authConnectInitiator } from '../actions/connect/connectInitiator';
import { authAutoConnect } from '../actions/connect/authAutoConnect';
import { createWeb3Service } from '../actions/connect/createWeb3Service';

export const useWeb3Connection = () => {
  const [, { isUninitialized }] = useQueryEndpoint(createWeb3Service);
  const [, { isLoading: isMakeAuthorizationLoading }] = useQueryEndpoint(
    authMakeAuthorization,
  );
  const [, { isLoading: isAuthConnectLoading }] = useQueryEndpoint(authConnect);

  const [connect, { isLoading: isConnectInitiatorLoading }] =
    useQueryEndpoint(authConnectInitiator);
  const [web3AutoConnect, { isLoading: isAuthAutoconnectLoading }] =
    useQueryEndpoint(authAutoConnect);
  const [disconnect, { isLoading: isDisconnectLoading }] =
    useQueryEndpoint(authDisconnect);

  const handleConnect = useCallback(
    async (walletId = INJECTED_WALLET_ID) => connect({ params: { walletId } }),
    [connect],
  );

  const handleAutoconnect = useCallback(
    (walletId = INJECTED_WALLET_ID) =>
      web3AutoConnect({ params: { walletId } }),
    [web3AutoConnect],
  );

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const loading =
    isAuthAutoconnectLoading ||
    isAuthConnectLoading ||
    isMakeAuthorizationLoading ||
    isConnectInitiatorLoading ||
    isDisconnectLoading ||
    isUninitialized;

  return {
    handleConnect,
    handleAutoconnect,
    handleDisconnect,
    loading,
  };
};
