import { useCallback, useState } from 'react';

import { trackSignUpModalOpen } from 'modules/analytics/mixpanel/trackSignUpModalOpen';

export const useSignUpDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = useCallback(() => setIsOpen(false), []);
  const handleOpen = useCallback(() => {
    setIsOpen(true);

    trackSignUpModalOpen();
  }, []);

  return { isOpen, handleOpen, onClose };
};
