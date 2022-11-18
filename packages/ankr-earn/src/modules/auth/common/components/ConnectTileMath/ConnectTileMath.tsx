import { EWalletId, getWalletName } from '@ankr.com/provider-core';

import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile';

import { ReactComponent as MathWalletIcon } from './assets/math-wallet-icon.svg';

const walletId = EWalletId.math;

export const ConnectTileMath = (): JSX.Element => {
  const { handleConnect } = useConnectForModal({ walletId });

  return (
    <ConnectTile
      iconSlot={<MathWalletIcon />}
      title={getWalletName(walletId)}
      onClick={handleConnect}
    />
  );
};
