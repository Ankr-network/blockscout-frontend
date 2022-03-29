import { useDispatchRequest } from '@redux-requests/react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { addBNBTokenToWallet } from 'modules/stake-bnb/actions/addBNBTokenToWallet';

import { useSelectedToken } from './useSelectedToken';

interface IUseSuccessDiaglog {
  isSuccessOpened: boolean;
  onSuccessOpen: () => void;
  onSuccessClose: () => void;
  onAddTokenClick: () => void;
}

export const useSuccessDialog = (): IUseSuccessDiaglog => {
  const { selectedToken } = useSelectedToken();
  const dispatchRequest = useDispatchRequest();
  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const onAddTokenClick = () => {
    dispatchRequest(addBNBTokenToWallet(selectedToken));
  };

  return {
    isSuccessOpened,
    onSuccessOpen,
    onSuccessClose,
    onAddTokenClick,
  };
};
