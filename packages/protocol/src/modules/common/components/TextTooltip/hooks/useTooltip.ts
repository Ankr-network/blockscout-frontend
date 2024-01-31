import { useCallback, useState } from 'react';

export interface UseTooltipParams {
  isOpen?: boolean;
}

export const useTooltip = ({
  isOpen = false,
}: UseTooltipParams | void = {}) => {
  const [open, setOpen] = useState(isOpen);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return { open, onOpen, onClose };
};
