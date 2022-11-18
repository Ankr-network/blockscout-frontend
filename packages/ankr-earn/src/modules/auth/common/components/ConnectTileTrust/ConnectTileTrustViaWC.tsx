import { EWalletId, getWalletName } from '@ankr.com/provider-core';

import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile';

import { ReactComponent as TrustWalletIcon } from './assets/trust-wallet-icon.svg';

const walletId = EWalletId.trustViaWalletConnect;

export const ConnectTileTrustViaWC = (): JSX.Element => {
  const { handleConnect } = useConnectForModal({ walletId });

  return (
    <ConnectTile
      iconSlot={<TrustWalletIcon />}
      title={getWalletName(walletId)}
      onClick={handleConnect}
    />
  );
};
