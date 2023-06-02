import { useCallback, useRef, useState } from 'react';

export const useMobileMenu = () => {
  const anchorEl = useRef<HTMLButtonElement | null>(null);

  const [isOpened, setIsOpened] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  const handleClick = useCallback(() => {
    setIsOpened(true);
  }, [setIsOpened]);

  return { anchorEl, isOpened, handleClick, handleClose };
};
