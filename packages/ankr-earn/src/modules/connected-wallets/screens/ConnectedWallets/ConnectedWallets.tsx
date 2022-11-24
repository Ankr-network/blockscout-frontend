import { ConnectWalletsModal } from 'modules/auth/common/components/ConnectWalletsModal';
import { NoReactSnap } from 'modules/common/components/NoReactSnap';
import { useDialog as useLocalDialog } from 'modules/common/hooks/useDialog';
import { ConnectedWalletsButton } from 'modules/connected-wallets/components/ConnectedWalletsButton';
import { ConnectedWalletsDialog } from 'modules/connected-wallets/components/ConnectedWalletsDialog';
import { EKnownDialogs, useDialog } from 'modules/dialogs';

import { useAuthWallets } from '../../hooks/useAuthWallets';

interface IConnectedWalletsProps {
  className?: string;
}

export const ConnectedWallets = ({
  className,
}: IConnectedWalletsProps): JSX.Element => {
  const {
    isOpened: isOpenedDialog,
    onClose: onCloseDialog,
    onOpen: onOpenDialog,
  } = useLocalDialog();

  const { handleOpen: onOpenModal } = useDialog(EKnownDialogs.connect);

  const { wallets, walletsGroupTypes } = useAuthWallets();

  return (
    <>
      <ConnectedWalletsButton
        className={className}
        connectHandler={onOpenModal}
        networks={wallets}
        walletsGroupTypes={walletsGroupTypes}
        onClick={onOpenDialog}
      />

      <NoReactSnap>
        <ConnectWalletsModal />
      </NoReactSnap>

      <ConnectedWalletsDialog
        networks={wallets}
        open={isOpenedDialog}
        walletsGroupTypes={walletsGroupTypes}
        onAddWallet={onOpenModal}
        onClose={onCloseDialog}
      />
    </>
  );
};
