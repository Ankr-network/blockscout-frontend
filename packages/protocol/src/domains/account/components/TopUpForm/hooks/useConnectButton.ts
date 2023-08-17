import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { shouldShowConnectWalletButton } from '../utils/shouldShowConnectWalletButton';

export const useConnectButton = () => {
  const {
    address,
    hasOauthLogin,
    hasUserEndpointToken,
    hasWeb3Connection,
    isUserEthAddressType,
  } = useAuth();

  const { hasConnectButton, isNewWeb3UserWithBindedEmail } = useMemo(
    () =>
      shouldShowConnectWalletButton({
        hasOauthLogin,
        hasUserEndpointToken,
        hasWeb3Connection,
        isUserAddress: isUserEthAddressType,
      }),
    [
      hasOauthLogin,
      hasUserEndpointToken,
      hasWeb3Connection,
      isUserEthAddressType,
    ],
  );

  return {
    hasConnectButton,
    buttonText: isNewWeb3UserWithBindedEmail
      ? t('header.wallet-button-address', { address: shrinkAddress(address) })
      : undefined,
  };
};
