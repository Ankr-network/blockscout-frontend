import { EWalletId, getIsOKXInjected, getWalletName } from '@ankr.com/provider';

import { OkxWalletIcon } from 'modules/common/components/Icons/OkxWalletIcon';

import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile';

const walletId = EWalletId.okxwallet;
const DOWNLOAD_OKX_URL = 'https://www.okx.com/wallet-docs/#download-guide';

export const ConnectTileOKX = (): JSX.Element => {
  const isOKXInjected = getIsOKXInjected();
  const { handleConnect } = useConnectForModal({ walletId });

  return (
    <ConnectTile
      href={isOKXInjected ? undefined : DOWNLOAD_OKX_URL}
      iconSlot={<OkxWalletIcon />}
      title={getWalletName(walletId)}
      onClick={handleConnect}
    />
  );
};
