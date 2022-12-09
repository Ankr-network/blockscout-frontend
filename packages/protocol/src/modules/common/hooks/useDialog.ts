import { useCallback, useState } from 'react';

interface IUseDialogData {
  isOpened: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useDialog = (defaultState = false): IUseDialogData => {
  const [isOpened, setIsOpened] = useState(defaultState);
  const onClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  const onOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  return {
    isOpened,
    onClose,
    onOpen,
  };
};
