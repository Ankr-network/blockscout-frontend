import { useCallback, useState } from 'react';

import { selectIsWeb3UserWithEmailBound } from 'domains/auth/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export const useConnectWalletDialog = () => {
  const isWeb3UserWithEmailBound = useAppSelector(
    selectIsWeb3UserWithEmailBound,
  );
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => {
    setIsOpened(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsOpened(false);
  }, []);

  return {
    isWeb3UserWithEmailBound,
    isOpened,
    handleOpenDialog,
    handleCloseDialog,
  };
};
