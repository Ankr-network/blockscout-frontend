import { Button, Modal } from '@mui/material';

import { ReactComponent as IconEdit } from 'assets/img/edit.svg';
import { ClientMapped } from 'modules/clients/store/clientsSlice';

import { useClientEditEmail } from './useClientEditEmail';
import { ClientEditEmailModalContent } from './ClientEditEmailModalContent';

interface IClientEditEmailModalProps {
  currentClient?: ClientMapped;
  disabled?: boolean;
}

export const ClientEditEmailModal = ({
  currentClient,
  disabled,
}: IClientEditEmailModalProps) => {
  const {
    open,
    handleSubmit,
    isLoading,
    emailValue,
    onInputEmailChange,
    handleClose,
    handleOpen,
  } = useClientEditEmail(currentClient);

  if (!currentClient?.address) {
    return null;
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        color="secondary"
        sx={{ ml: 4 }}
        startIcon={<IconEdit />}
        disabled={isLoading || disabled}
      >
        Edit Email
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="manage-client-email-modal"
      >
        <ClientEditEmailModalContent
          handleSubmit={handleSubmit}
          clientEthAddress={currentClient.address}
          isLoading={isLoading}
          emailValue={emailValue}
          onInputEmailChange={onInputEmailChange}
          handleClose={handleClose}
        />
      </Modal>
    </>
  );
};
