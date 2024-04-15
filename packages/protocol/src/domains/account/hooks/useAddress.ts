import { useEffect, useState } from 'react';

import { MultiService } from 'modules/api/MultiService';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { useLazyAccountRedirectIfWalletConnectFailedQuery } from '../actions/balance/redirectIfWalletConnectFailed';
import { useSelectedUserGroup } from '../../userGroup/hooks/useSelectedUserGroup';

export const useAddress = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();
  const [address, setAddress] = useState('');

  const { isLoggedIn, isUserEthAddressType } = useAuth();
  const [redirectIfWalletConnectFailed] =
    useLazyAccountRedirectIfWalletConnectFailedQuery();

  useEffect(() => {
    const getWeb3Address = async () => {
      if (selectedGroupAddress) {
        setAddress(selectedGroupAddress);
      } else {
        try {
          const service = MultiService.getWeb3Service();

          const provider = service?.getKeyWriteProvider();
          const { currentAccount = '' } = provider ?? {};

          setAddress(currentAccount);
        } catch (e) {
          setAddress('');
          redirectIfWalletConnectFailed();
        }
      }
    };

    if (isLoggedIn && isUserEthAddressType) {
      getWeb3Address();
    }

    return () => setAddress('');
  }, [
    isLoggedIn,
    isUserEthAddressType,
    redirectIfWalletConnectFailed,
    selectedGroupAddress,
  ]);

  return address;
};
