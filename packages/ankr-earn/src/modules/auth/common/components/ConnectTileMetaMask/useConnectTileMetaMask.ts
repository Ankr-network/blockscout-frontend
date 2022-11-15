import { EWalletId } from '@ankr.com/provider-core';

import {
  getIsCoinbaseInjected,
  getIsMetaMaskInjected,
  getIsOKXInjected,
} from '@ankr.com/provider';
import { t } from 'common';

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

  const isMetaMaskOverridedByCoin98 = !!(
    window.ethereum as { isCoin98: boolean } | undefined
  )?.isCoin98;

  const isMetaMaskDisabledByOtherWallets = isCoinbaseInjected && isOKXInjected;

  const isMetaMaskDisabled =
    isMetaMaskDisabledByOtherWallets || isMetaMaskOverridedByCoin98;

  const tooltip = useLocaleMemo(() => {
    if (isMetaMaskOverridedByCoin98) {
      return t('wallets.tooltips.metamask-coin98');
    }

    if (isMetaMaskDisabledByOtherWallets) {
      return t('wallets.tooltips.metamask-other');
    }

    return undefined;
  }, [
    isMetaMaskOverridedByCoin98,
    isMetaMaskDisabledByOtherWallets,
    isMetamaskInjected,
    isMetaMaskDisabled,
  ]);

  return {
    isDisabled: isMetaMaskDisabled,
    tooltip,
    isInjected: isMetamaskInjected,
    handleClick: handleConnect,
  };
};
