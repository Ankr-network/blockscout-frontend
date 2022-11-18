import { EWalletId, getWalletName } from '@ankr.com/provider';

import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile';

import { ReactComponent as WalletConnectIcon } from './assets/wallet-connect-icon.svg';

const walletId = EWalletId.walletconnect;

export const ConnectTileWalletConnect = (): JSX.Element => {
  const { handleConnect } = useConnectForModal({ walletId });

  return (
    <ConnectTile
      iconSlot={<WalletConnectIcon />}
      title={getWalletName(walletId)}
      onClick={handleConnect}
    />
  );
};
