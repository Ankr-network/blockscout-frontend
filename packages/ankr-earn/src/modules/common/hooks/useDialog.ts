import { useCallback, useState } from 'react';

export const useDialog = (defaultState = false) => {
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
