import { t } from '@ankr.com/common';

import {
  EWalletId,
  getCloverProvider,
  getIsClover,
  getIsCloverInjected,
  getWalletName,
} from '@ankr.com/provider';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile';

import { ReactComponent as CloverWalletIcon } from './assets/clv-logo.svg';

const walletId = EWalletId.clover;
const DOWNLOAD_CLOVER_URL =
  'https://docs.clv.org/use-clv-wallet/clv-extension-wallet';

export const ConnectTileClover = (): JSX.Element => {
  const { handleConnect } = useConnectForModal({ walletId });
  const isInjected = getIsCloverInjected();
  const cloverProvider = getCloverProvider();
  const isCloverActive = getIsClover(cloverProvider);
  const isDisabled = isInjected && !isCloverActive;

  const tooltip = useLocaleMemo(() => {
    if (isDisabled) {
      return t('wallets.tooltips.clover-disabled');
    }
    return undefined;
  }, [isDisabled]);

  return (
    <ConnectTile
      href={isInjected ? undefined : DOWNLOAD_CLOVER_URL}
      iconSlot={<CloverWalletIcon />}
      isDisabled={isDisabled}
      title={getWalletName(walletId)}
      tooltip={tooltip}
      onClick={handleConnect}
    />
  );
};
