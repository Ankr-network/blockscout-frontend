import { useDispatchRequest } from '@redux-requests/react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { addFTMTokenToWallet } from 'modules/stake-fantom/actions/addFTMTokenToWallet';

interface IUseSuccessDialogData {
  isSuccessOpened: boolean;
  onSuccessOpen: () => void;
  onSuccessClose: () => void;
  onAddTokenClick: () => void;
}

export const useSuccessDialog = (): IUseSuccessDialogData => {
  const dispatchRequest = useDispatchRequest();

  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const onAddTokenClick = () => {
    dispatchRequest(addFTMTokenToWallet());
  };

  return {
    isSuccessOpened,
    onSuccessOpen,
    onSuccessClose,
    onAddTokenClick,
  };
};
