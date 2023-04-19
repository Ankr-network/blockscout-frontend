import { useEffect, useState } from 'react';

import { MultiService } from 'modules/api/MultiService';
import { useLazyAccountRedirectIfWalletConnectFailedQuery } from '../actions/balance/redirectIfWalletConnectFailed';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from '../../userGroup/hooks/useSelectedUserGroup';

export const useAddress = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();
  const [address, setAddress] = useState('');

  const { isWalletConnected } = useAuth();
  const [redirectIfWalletConnectFailed] =
    useLazyAccountRedirectIfWalletConnectFailedQuery();

  useEffect(() => {
    const getWeb3Address = async () => {
      if (selectedGroupAddress) {
        setAddress(selectedGroupAddress);
      } else {
        try {
          const service = await MultiService.getWeb3Service();

          const provider = service.getKeyProvider();
          const { currentAccount } = provider;

          setAddress(currentAccount);
        } catch (e) {
          setAddress('');
          redirectIfWalletConnectFailed();
        }
      }
    };

    if (isWalletConnected) {
      getWeb3Address();
    }

    return () => setAddress('');
  }, [isWalletConnected, redirectIfWalletConnectFailed, selectedGroupAddress]);

  return address;
};
