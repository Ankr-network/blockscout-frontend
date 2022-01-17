import { useAuth } from 'modules/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';
import { ConnectedWalletsButton } from 'modules/connected-wallets/components/ConnectedWalletsButton';
import { ConnectedWalletsDialog } from 'modules/connected-wallets/components/ConnectedWalletsDialog';
import {
  MATIC_STAKING_NETWORKS,
  POLYGON_PROVIDER_ID,
} from 'modules/stake-polygon/const';

interface IConnectedWalletsProps {
  className?: string;
}

export const ConnectedWallets = ({ className }: IConnectedWalletsProps) => {
  const { onOpen, onClose, isOpened } = useDialog();

  // TODO: add more providers in the future
  const polygonAuth = useAuth(POLYGON_PROVIDER_ID, MATIC_STAKING_NETWORKS);

  const networks = [];

  if (polygonAuth.isConnected) {
    networks.push({
      network: polygonAuth.walletName as string,
      addresses: [
        {
          tokenIconSrc: polygonAuth.walletIcon as string,
          address: polygonAuth.address as string,
        },
      ],
      disconnect: polygonAuth.dispatchDisconnect,
    });
  }

  return (
    <>
      <ConnectedWalletsButton
        networks={networks}
        onClick={onOpen}
        connectHandler={polygonAuth.dispatchConnect}
        className={className}
      />
      <ConnectedWalletsDialog
        networks={networks}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
