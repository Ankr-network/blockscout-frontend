import { t } from '@ankr.com/common';

import {
  EWalletId,
  getIsCoinbaseInjected,
  getIsMetaMaskInjected,
  getIsOKXInjected,
  getIsTrustWalletInjected,
} from '@ankr.com/provider';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { useConnectForModal } from '../../hooks/useConnectForModal';

interface IUseConnectTileMetaMask {
  isDisabled: boolean;
  tooltip?: string;
  isInjected: boolean;
  handleClick: () => Promise<void>;
}

export const useConnectTileMetaMask = (): IUseConnectTileMetaMask => {
  const { handleConnect } = useConnectForModal({
    walletId: EWalletId.injected,
  });

  const isCoinbaseInjected = getIsCoinbaseInjected();
  const isOKXInjected = getIsOKXInjected();
  const isMetamaskInjected = getIsMetaMaskInjected();
  const isTrustWalletInjected = getIsTrustWalletInjected();

  const isOverridedByCoin98 = !!(
    window.ethereum as { isCoin98: boolean } | undefined
  )?.isCoin98;

  const isDisabledByOtherWallets = isCoinbaseInjected && isOKXInjected;
  const isDisabledByTrustWallet = isTrustWalletInjected && !isMetamaskInjected;

  const isDisabled =
    isDisabledByOtherWallets || isOverridedByCoin98 || isDisabledByTrustWallet;

  const tooltip = useLocaleMemo(() => {
    if (isOverridedByCoin98) {
      return t('wallets.tooltips.metamask-coin98');
    }

    if (isDisabledByOtherWallets) {
      return t('wallets.tooltips.metamask-other');
    }

    if (isDisabledByTrustWallet) {
      return t('wallets.tooltips.metamask-trust');
    }

    return undefined;
  }, [isOverridedByCoin98, isDisabledByOtherWallets, isDisabledByTrustWallet]);

  return {
    isDisabled,
    tooltip,
    isInjected: isMetamaskInjected,
    handleClick: handleConnect,
  };
};
