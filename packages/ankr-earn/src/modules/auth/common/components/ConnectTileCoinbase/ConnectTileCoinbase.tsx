import { EWalletId, getWalletName , getIsCoinbaseInjected } from '@ankr.com/provider';


import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile';

import { ReactComponent as CoinbaseIcon } from './assets/coinbase.svg';

const DOWNLOAD_COINBASE_URL = 'https://www.coinbase.com/wallet';
const walletId = EWalletId.coinbase;

export const ConnectTileCoinbase = (): JSX.Element => {
  const isCoinbaseInjected = getIsCoinbaseInjected();
  const { handleConnect } = useConnectForModal({ walletId });

  return (
    <ConnectTile
      href={isCoinbaseInjected ? undefined : DOWNLOAD_COINBASE_URL}
      iconSlot={<CoinbaseIcon />}
      title={getWalletName(walletId)}
      onClick={handleConnect}
    />
  );
};
