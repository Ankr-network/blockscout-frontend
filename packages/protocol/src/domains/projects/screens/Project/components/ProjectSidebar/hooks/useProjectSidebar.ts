import { useCallback, useState } from 'react';

export interface UseProjectSidebarParams {
  isOpened?: boolean;
}

export const useProjectSidebar = ({
  isOpened: isInitiallyOpened = false,
}: UseProjectSidebarParams | void = {}) => {
  const [isOpened, setIsOpened] = useState(isInitiallyOpened);

  const handleOpen = useCallback(() => setIsOpened(true), []);

  const handleClose = useCallback(() => setIsOpened(false), []);

  return { handleClose, handleOpen, isOpened };
};
