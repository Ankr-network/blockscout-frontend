import { useCallback, useState } from 'react';

export const useSignUpDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = useCallback(() => setIsOpen(false), []);
  const handleOpen = useCallback(() => setIsOpen(true), []);

  return { isOpen, handleOpen, onClose };
};
