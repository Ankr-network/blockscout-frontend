import { useCallback, useState } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { Chain } from 'domains/chains/types';

export const useChainSelectModal = () => {
  const { isOpened, onClose, onOpen } = useDialog();
  const [currentModalChain, setCurrentModalChain] = useState<
    Chain | undefined
  >();

  const onOpenModal = useCallback(
    (chain: Chain) => {
      onOpen();
      setCurrentModalChain(chain);
    },
    [onOpen, setCurrentModalChain],
  );

  return {
    isOpened,
    onClose,
    onOpenModal,
    currentModalChain,
  };
};
