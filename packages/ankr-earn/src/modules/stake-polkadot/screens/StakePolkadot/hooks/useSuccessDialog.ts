import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { addETHTokenToWallet } from 'modules/stake-polkadot/actions/addETHTokenToWallet';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';

interface IUseSuccessDialogData {
  isSuccessOpened: boolean;
  onAddTokenClick: () => void;
  onSuccessClose: () => void;
  onSuccessOpen: () => void;
}

export const useSuccessDialog = (
  network: EPolkadotNetworks,
): IUseSuccessDialogData => {
  const dispatchRequest = useDispatchRequest();

  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const onAddTokenClick = useCallback(() => {
    dispatchRequest(addETHTokenToWallet(network));
  }, [dispatchRequest, network]);

  return {
    isSuccessOpened,
    onAddTokenClick,
    onSuccessClose,
    onSuccessOpen,
  };
};
