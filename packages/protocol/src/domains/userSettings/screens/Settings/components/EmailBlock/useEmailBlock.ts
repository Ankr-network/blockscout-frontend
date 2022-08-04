import { useCallback, useState } from 'react';

export const useEmailBlock = () => {
  const [isChangeEmailDialogOpen, setIsChangeEmailDialogOpen] = useState(false);

  const closeChangeEmailDialog = useCallback(
    () => setIsChangeEmailDialogOpen(false),
    [],
  );
  const openChangeEmailDialog = useCallback(
    () => setIsChangeEmailDialogOpen(true),
    [],
  );

  return {
    isChangeEmailDialogOpen,
    closeChangeEmailDialog,
    openChangeEmailDialog,
  };
};
