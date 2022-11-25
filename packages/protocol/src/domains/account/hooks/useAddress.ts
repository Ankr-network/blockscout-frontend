import { useEffect, useState } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { MultiService } from 'modules/api/MultiService';
import { redirectIfWalletConnectFailed } from 'domains/account/actions/balance/redirectIfWalletConnectFailed';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useAddress = () => {
  const [address, setAddress] = useState('');
  const dispatchRequest = useDispatchRequest();
  const { isWalletConnected } = useAuth();

  useEffect(() => {
    const getWeb3Address = async () => {
      try {
        const service = await MultiService.getWeb3Service();

        const provider = service.getKeyProvider();
        const { currentAccount } = provider;

        setAddress(currentAccount);
      } catch (e) {
        setAddress('');
        dispatchRequest(redirectIfWalletConnectFailed());
      }
    };

    if (isWalletConnected) {
      getWeb3Address();
    }

    return () => setAddress('');
  }, [dispatchRequest, isWalletConnected]);

  return address;
};
