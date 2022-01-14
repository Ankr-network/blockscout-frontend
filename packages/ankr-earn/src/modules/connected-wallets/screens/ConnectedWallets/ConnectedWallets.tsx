import { useAuth } from 'modules/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';
import { ConnectedWalletsButton } from 'modules/connected-wallets/components/ConnectedWalletsButton';
import { ConnectedWalletsDialog } from 'modules/connected-wallets/components/ConnectedWalletsDialog';
import { POLYGON_PROVIDER_ID } from 'modules/stake-polygon/const';

interface IConnectedWalletsProps {
  className?: string;
}

export const ConnectedWallets = ({ className }: IConnectedWalletsProps) => {
  const { onOpen, onClose, isOpened } = useDialog();

  // TODO: add more providers in the future
  const auth = useAuth(POLYGON_PROVIDER_ID);

  const networks = [];

  if (auth.isConnected) {
    networks.push({
      network: auth.walletName as string,
      addresses: [
        {
          tokenIconSrc: auth.walletIcon as string,
          address: auth.address as string,
        },
      ],
      disconnect: auth.dispatchDisconnect,
    });
  }

  return (
    <>
      <ConnectedWalletsButton
        networks={networks}
        onClick={onOpen}
        connectHandler={auth.dispatchConnect}
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
