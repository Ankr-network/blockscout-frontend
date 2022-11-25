import { useCallback } from 'react';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';

import { connect } from '../actions/connect';
import { disconnect } from '../actions/disconnect';
import { addNetwork } from '../actions/addNetwork';
import { INJECTED_WALLET_ID } from 'modules/api/MultiService';

export const useWeb3Connection = () => {
  const dispatchRequest = useDispatchRequest();

  const handleConnect = useCallback(
    async (walletId = INJECTED_WALLET_ID, isAutoConnect?: boolean) => {
      const isManualConnected = !isAutoConnect;

      return dispatchRequest(connect(walletId, isManualConnected));
    },
    [dispatchRequest],
  );

  const handleDisconnect = useCallback(() => {
    dispatchRequest(disconnect());
  }, [dispatchRequest]);

  const handleAddNetwork = useCallback(
    chainParams => {
      dispatchRequest(addNetwork(chainParams));
    },
    [dispatchRequest],
  );

  const { data: connectData, loading: loadingConnect } = useQuery({
    action: connect,
    type: connect.toString(),
  });

  const { loading: loadingDisconnect } = useMutation({
    type: disconnect.toString(),
  });

  return {
    handleConnect,
    handleDisconnect,
    handleAddNetwork,
    loading: loadingConnect || loadingDisconnect,
    isWalletConnected: Boolean(connectData?.address),
    connectData,
  };
};
