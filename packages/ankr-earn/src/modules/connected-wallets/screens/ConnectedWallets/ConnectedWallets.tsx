import { useAuth } from 'modules/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';
import { ConnectedWalletsButton } from 'modules/connected-wallets/components/ConnectedWalletsButton';
import { ConnectedWalletsDialog } from 'modules/connected-wallets/components/ConnectedWalletsDialog';
import { POLYGON_PROVIDER_ID } from 'modules/stake-polygon/const';

interface IConnectedWalletsProps {
  className?: string;
}

export const ConnectedWallets = ({
  className,
}: IConnectedWalletsProps): JSX.Element => {
  const { onOpen, onClose, isOpened } = useDialog();

  // TODO: add more providers in the future
  const polygonAuth = useAuth(POLYGON_PROVIDER_ID);

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
        className={className}
        connectHandler={polygonAuth.dispatchConnect}
        networks={networks}
        onClick={onOpen}
      />

      <ConnectedWalletsDialog
        networks={networks}
        open={isOpened}
        onClose={onClose}
      />
    </>
  );
};
