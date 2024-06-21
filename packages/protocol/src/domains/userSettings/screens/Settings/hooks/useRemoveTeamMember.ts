import { useCallback, useState } from 'react';
import { Web3Address } from 'multirpc-sdk';

import { useDialog } from 'modules/common/hooks/useDialog';

export const useRemoveTeamMember = () => {
  const { isOpened, onClose, onOpen } = useDialog();

  const [teammateToRemoveAddress, setTeammateToRemoveAddress] = useState('');
  const [teammateToRemoveEmail, setTeammateToRemoveEmail] = useState('');

  const handleRemoveUser = useCallback(
    (teammateAddress: Web3Address, email: string) => {
      setTeammateToRemoveAddress(teammateAddress);
      setTeammateToRemoveEmail(email);
      onOpen();
    },
    [onOpen],
  );

  const handleClose = useCallback(() => {
    setTeammateToRemoveAddress('');
    setTeammateToRemoveEmail('');
    onClose();
  }, [onClose]);

  return {
    isOpened,
    handleClose,
    teammateToRemoveAddress,
    teammateToRemoveEmail,
    handleRemoveUser,
  };
};
