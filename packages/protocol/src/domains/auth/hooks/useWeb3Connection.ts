import { useCallback } from 'react';

import { AuthConnectParams, authConnect } from '../actions/connect';
import {
  IChainParams,
  useLazyAuthAddNetworkQuery,
} from '../actions/addNetwork';
import { IConnect } from '../actions/connectUtils';
import { INJECTED_WALLET_ID } from 'modules/api/MultiService';
import { Trigger, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { authDisconnect } from '../actions/disconnect';

type HandleConnect = (
  walletId: string,
  isAutoConnect?: boolean,
) => ReturnType<Trigger<AuthConnectParams, IConnect>>;

export interface Web3Connection {
  connectData?: IConnect;
  handleAddNetwork: (params: IChainParams) => void;
  handleConnect: HandleConnect;
  handleDisconnect: () => void;
  isWalletConnected: boolean;
  loading: boolean;
}

export const useWeb3Connection = (): Web3Connection => {
  const [addNetwork] = useLazyAuthAddNetworkQuery();

  const [connect, { data: connectData, isLoading: isConnecting }] =
    useQueryEndpoint(authConnect);
  const [disconnect, { isLoading: isDisconnecting }] =
    useQueryEndpoint(authDisconnect);

  const handleConnect = useCallback(
    (walletId = INJECTED_WALLET_ID) => {
      return connect({ walletId });
    },
    [connect],
  );

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const handleAddNetwork = useCallback(
    (chainParams: IChainParams) => {
      addNetwork(chainParams);
    },
    [addNetwork],
  );

  return {
    connectData,
    handleAddNetwork,
    handleConnect,
    handleDisconnect,
    isWalletConnected: Boolean(connectData?.address),
    loading: isConnecting || isDisconnecting,
  };
};
