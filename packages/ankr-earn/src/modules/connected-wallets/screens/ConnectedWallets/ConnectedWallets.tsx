import { ConnectWalletsModal } from 'modules/auth/common/components/ConnectWalletsModal';
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

  const {
    isOpened: isOpenedModal,
    handleOpen: onOpenModal,
    handleClose: onCloseModal,
  } = useDialog(EKnownDialogs.connect);

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

      <ConnectWalletsModal
        isOpen={isOpenedModal}
        walletsGroupTypes={walletsGroupTypes}
        onClose={onCloseModal}
      />

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
