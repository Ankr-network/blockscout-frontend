import {
  EWalletId,
  getIsTrustWalletInjected,
  getWalletName,
} from '@ankr.com/provider';

import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile';

import { ReactComponent as TrustWalletIcon } from './assets/trust-wallet-icon.svg';

const walletId = EWalletId.trust;
const DOWNLOAD_TRUST_URL = 'https://trustwallet.com/download';

export const ConnectTileTrust = (): JSX.Element => {
  const isTrustWalletInjected = getIsTrustWalletInjected();
  const { handleConnect } = useConnectForModal({ walletId });

  return (
    <ConnectTile
      href={isTrustWalletInjected ? undefined : DOWNLOAD_TRUST_URL}
      iconSlot={<TrustWalletIcon />}
      title={getWalletName(walletId)}
      onClick={handleConnect}
    />
  );
};