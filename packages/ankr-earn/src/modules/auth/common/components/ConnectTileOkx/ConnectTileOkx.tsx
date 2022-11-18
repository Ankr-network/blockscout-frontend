import { EWalletId, getWalletName } from '@ankr.com/provider-core';

import { getIsOKXInjected } from '@ankr.com/provider';

import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile';

import { ReactComponent as OKXIcon } from './assets/okx-wallet-icon.svg';

const walletId = EWalletId.okxwallet;
const DOWNLOAD_OKX_URL = 'https://www.okx.com/wallet-docs/#download-guide';

export const ConnectTileOKX = (): JSX.Element => {
  const isOKXInjected = getIsOKXInjected();
  const { handleConnect } = useConnectForModal({ walletId });

  return (
    <ConnectTile
      href={isOKXInjected ? undefined : DOWNLOAD_OKX_URL}
      iconSlot={<OKXIcon />}
      title={getWalletName(walletId)}
      onClick={handleConnect}
    />
  );
};
