import { EWalletId, getWalletName } from '@ankr.com/provider-core';

import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile';

import { ReactComponent as HuobiWalletIcon } from './assets/huobi-wallet-icon.svg';

const walletId = EWalletId.huobi;

export const ConnectTileHuobi = (): JSX.Element => {
  const { handleConnect } = useConnectForModal({ walletId });

  return (
    <ConnectTile
      iconSlot={<HuobiWalletIcon />}
      title={getWalletName(walletId)}
      onClick={handleConnect}
    />
  );
};
