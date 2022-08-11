import { useEffect, useState } from 'react';

import { MultiService } from 'modules/api/MultiService';
import { useDispatchRequest } from '@redux-requests/react';
import { redirectIfWalletConnectFailed } from '../actions/balance/redirectIfWalletConnectFailed';

export const useAddress = () => {
  const [address, setAddress] = useState('');
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    const getAddress = async () => {
      try {
        const service = await MultiService.getInstance();

        const provider = service.getKeyProvider();
        const { currentAccount } = provider;

        setAddress(currentAccount);
      } catch (e) {
        setAddress('');
        dispatchRequest(redirectIfWalletConnectFailed());
      }
    };

    getAddress();

    return () => setAddress('');
  }, [dispatchRequest]);

  return address;
};
