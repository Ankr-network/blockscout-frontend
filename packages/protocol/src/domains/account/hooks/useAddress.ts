import { useEffect, useState } from 'react';

import { MultiService } from 'modules/api/MultiService';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { useLazyAccountRedirectIfWalletConnectFailedQuery } from '../actions/balance/redirectIfWalletConnectFailed';
import { useSelectedUserGroup } from '../../userGroup/hooks/useSelectedUserGroup';

export const useAddress = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();
  const [address, setAddress] = useState('');

  const { isWalletConnected, isUserEthAddressType } = useAuth();
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

    if (isWalletConnected && isUserEthAddressType) {
      getWeb3Address();
    }

    return () => setAddress('');
  }, [
    isWalletConnected,
    isUserEthAddressType,
    redirectIfWalletConnectFailed,
    selectedGroupAddress,
  ]);

  return address;
};
