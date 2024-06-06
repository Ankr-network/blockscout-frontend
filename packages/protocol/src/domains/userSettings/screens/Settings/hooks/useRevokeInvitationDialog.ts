import { useCallback, useState } from 'react';
import { Web3Address } from 'multirpc-sdk';

import { useDialog } from 'modules/common/hooks/useDialog';

export const useRevokeInvitation = () => {
  const { isOpened, onClose, onOpen } = useDialog();

  const [emailToRevoke, setEmailToRevoke] = useState('');

  const handleRevokeInvitation = useCallback(
    (teammateAddress: Web3Address) => {
      setEmailToRevoke(teammateAddress);
      onOpen();
    },
    [onOpen],
  );

  const handleClose = useCallback(() => {
    setEmailToRevoke('');
    onClose();
  }, [onClose]);

  return {
    isOpened,
    handleClose,
    emailToRevoke,
    handleRevokeInvitation,
  };
};
