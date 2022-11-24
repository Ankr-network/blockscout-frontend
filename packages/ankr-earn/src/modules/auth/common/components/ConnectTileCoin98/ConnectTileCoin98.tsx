import {
  EWalletId,
  getWalletName,
  getIsCoin98Injected,
} from '@ankr.com/provider';

import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile';

import { ReactComponent as IconCoin98 } from './assets/coin98.svg';

const DOWNLOAD_COIN98_URL =
  'https://docs.coin98.com/products/coin98-super-app/extension#install-coin98-extension';
const walletId = EWalletId.coin98;

export const ConnectTileCoin98 = (): JSX.Element => {
  const { handleConnect } = useConnectForModal({ walletId });
  const isInjected = getIsCoin98Injected();

  return (
    <ConnectTile
      href={isInjected ? undefined : DOWNLOAD_COIN98_URL}
      iconSlot={<IconCoin98 style={{ width: 64, height: 64 }} />}
      title={getWalletName(walletId)}
      onClick={handleConnect}
    />
  );
};
