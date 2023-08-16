import { Button, MenuItem, Modal } from '@mui/material';

import { ReactComponent as IconWallet } from 'assets/img/wallet.svg';
import { ClientMapped } from 'modules/clients/store/clientsSlice';
import { useModal } from 'modules/common/hooks/useModal';

import { useClientDetailsStyles as useStyles } from '../ClientDetailsStyles';
import { ClientBalancesModalContent } from './ClientBalancesModalContent';

export const ClientBalancesModal = ({
  currentClient,
  isMenuElement,
}: {
  currentClient: ClientMapped;
  isMenuElement?: boolean;
}) => {
  const { classes } = useStyles();
  const { open, handleOpen, handleClose } = useModal();

  const handleClickMenuButton = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    handleOpen();
  };

  return (
    <>
      {isMenuElement ? (
        <MenuItem onClick={handleClickMenuButton}>
          <IconWallet style={{ marginRight: 8 }} />
          Manage credits
        </MenuItem>
      ) : (
        <Button
          onClick={handleOpen}
          color="secondary"
          className={classes.balancesBtn}
          startIcon={<IconWallet />}
        >
          Manage Credits
        </Button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="manage-client-balance-modal"
      >
        <ClientBalancesModalContent
          currentClient={currentClient}
          onClose={handleClose}
        />
      </Modal>
    </>
  );
};
