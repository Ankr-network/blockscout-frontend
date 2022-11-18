import { EWalletId, getWalletName } from '@ankr.com/provider';

import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile';

import { ReactComponent as ImTokenWalletIcon } from './assets/imtoken-wallet-icon.svg';

const walletId = EWalletId.imtoken;

export const ConnectTileImToken = (): JSX.Element => {
  const { handleConnect } = useConnectForModal({ walletId });

  return (
    <ConnectTile
      iconSlot={<ImTokenWalletIcon />}
      title={getWalletName(walletId)}
      onClick={handleConnect}
    />
  );
};
