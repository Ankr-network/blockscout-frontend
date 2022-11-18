import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import { EKnownDialogs, useDialog } from 'modules/dialogs';

import { connect } from '../actions/connect';
import { TWalletId } from '../types';

interface IUseConnectForModalArgs {
  walletId: TWalletId;
  provider?: AvailableWriteProviders;
}

interface IUseConnectForModal {
  handleConnect: () => Promise<void>;
}

export const useConnectForModal = ({
  walletId,
  provider = AvailableWriteProviders.ethCompatible,
}: IUseConnectForModalArgs): IUseConnectForModal => {
  const dispatchRequest = useDispatchRequest();
  const { handleClose } = useDialog(EKnownDialogs.connect);

  const handleConnect = useCallback(async () => {
    const response = await dispatchRequest(connect(provider, walletId));

    if (response.data) {
      handleClose();
    }
  }, [dispatchRequest, handleClose, provider, walletId]);

  return {
    handleConnect,
  };
};
