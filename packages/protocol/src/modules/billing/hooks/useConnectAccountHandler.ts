import { Web3Address } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isMetamaskError } from 'modules/common/utils/isMetamaskError';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { connectAccount } from '../utils/connectAccount';

const { showNotification } = NotificationActions;

export type TConnectAccountSuccessHandler = (
  authAddress: Web3Address,
  currentAddress: Web3Address,
) => void;

export interface IUseConnectAccountHandlerParams {
  onSuccess?: TConnectAccountSuccessHandler;
}

export const useConnectAccountHandler = ({
  onSuccess,
}: IUseConnectAccountHandlerParams | void = {}) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const { address: authAddress } = useAuth();

  const dispatch = useDispatch();

  const handleSuccess = useCallback(
    (currentAddress: Web3Address) => onSuccess?.(authAddress, currentAddress),
    [authAddress, onSuccess],
  );

  const handleConnectAccount = useCallback(async () => {
    const onError = (error: unknown) => {
      const message = isMetamaskError(error)
        ? error.message
        : t('error.common');

      dispatch(showNotification({ message, severity: 'error' }));
    };

    setIsConnecting(true);

    const connectedAccount = await connectAccount({ onError });

    handleSuccess?.(connectedAccount);

    setIsConnecting(false);
  }, [dispatch, handleSuccess]);

  return { handleConnectAccount, isConnecting };
};
