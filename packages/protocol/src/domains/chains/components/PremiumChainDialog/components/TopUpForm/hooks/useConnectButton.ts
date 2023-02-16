import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { shouldShowConnectWalletButton } from 'domains/pricing/screens/Pricing/components/PremiumBlock/PremiumBlockUtils';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useConnectButton = () => {
  const {
    address,
    hasOauthLogin,
    hasPrivateAccess,
    hasWeb3Connection,
    isUserEthAddressType,
  } = useAuth();

  const { hasConnectButton, isNewWeb3UserWithBindedEmail } = useMemo(
    () =>
      shouldShowConnectWalletButton({
        hasOauthLogin,
        hasWeb3Connection,
        hasPrivateAccess,
        isUserAddress: isUserEthAddressType,
      }),
    [hasOauthLogin, hasPrivateAccess, hasWeb3Connection, isUserEthAddressType],
  );

  return {
    hasConnectButton,
    buttonText: isNewWeb3UserWithBindedEmail
      ? t('header.wallet-button-address', { address: shrinkAddress(address) })
      : undefined,
  };
};
