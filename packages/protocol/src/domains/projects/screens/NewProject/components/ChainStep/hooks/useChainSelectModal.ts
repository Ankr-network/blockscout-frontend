import { useCallback, useState } from 'react';
import { useForm } from 'react-final-form';
import { Chain } from '@ankr.com/chains-list';

import { useDialog } from 'modules/common/hooks/useDialog';

import { NewProjectFormValues } from '../../NewProjectForm/NewProjectFormTypes';

export const useChainSelectModal = () => {
  const { isOpened, onClose, onOpen } = useDialog();
  const [currentModalChain, setCurrentModalChain] = useState<
    Chain | undefined
  >();
  const [valuesBeforeChange, setValuesBeforeChange] =
    useState<NewProjectFormValues>();

  const { getState } = useForm<NewProjectFormValues>();
  const { values } = getState();

  const onOpenModal = useCallback(
    (chain: Chain) => {
      setValuesBeforeChange(values);

      onOpen();
      setCurrentModalChain(chain);
    },
    [onOpen, setCurrentModalChain, values],
  );

  return {
    currentModalChain,
    isOpened,
    onClose,
    onOpenModal,
    valuesBeforeChange,
  };
};
