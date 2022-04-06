import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { addTokenToWallet } from 'modules/stake-eth/actions/addTokenToWallet';

import { useSelectedToken } from './useSelectedToken';

interface IUseSuccessDialog {
  isSuccessOpened: boolean;
  onSuccessOpen: () => void;
  onSuccessClose: () => void;
  onAddTokenClick: () => void;
}

export const useSuccessDialog = (): IUseSuccessDialog => {
  const dispatchRequest = useDispatchRequest();
  const { selectedToken } = useSelectedToken();
  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const onAddTokenClick = useCallback(() => {
    dispatchRequest(addTokenToWallet(selectedToken));
  }, [dispatchRequest, selectedToken]);

  return {
    isSuccessOpened,
    onSuccessOpen,
    onSuccessClose,
    onAddTokenClick,
  };
};
