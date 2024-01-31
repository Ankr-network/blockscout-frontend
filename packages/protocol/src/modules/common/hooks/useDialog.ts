import { useCallback, useState } from 'react';

export const useDialog = (defaultState = false) => {
  const [isOpened, setIsOpened] = useState(defaultState);
  const [isHidden, setIsHidden] = useState(false);

  const onClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  const onOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  const handleHide = useCallback(() => setIsHidden(true), []);
  const handleShow = useCallback(() => setIsHidden(false), []);

  return {
    handleHide,
    handleShow,
    isHidden,
    isOpened,
    onClose,
    onOpen,
  };
};
