import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isMetamaskError } from 'modules/common/utils/isMetamaskError';
import { isMutationSuccessful } from 'store/utils/isMutationSuccessful';
import { useConnectWalletAccountMutation } from 'domains/account/actions/connectWalletAccount';

const { showNotification } = NotificationActions;

export interface IUseConnectAccountHandlerProps {
  onSuccess?: (connectedAddress: string) => void;
}

export const useConnectAccountHandler = ({
  onSuccess,
}: IUseConnectAccountHandlerProps | void = {}) => {
  const [connectAccount, { isLoading: isConnecting }] =
    useConnectWalletAccountMutation();

  const dispatch = useDispatch();

  const handleConnectAccount = useCallback(async () => {
    const result = await connectAccount();

    if (isMutationSuccessful(result)) {
      const { data: connectedAddress } = result;

      if (connectedAddress) {
        onSuccess?.(connectedAddress);
      }
    } else {
      const { error } = result;

      const message = isMetamaskError(error)
        ? error.message
        : t('error.common');

      dispatch(showNotification({ message, severity: 'error' }));
    }
  }, [connectAccount, dispatch, onSuccess]);

  return { handleConnectAccount, isConnecting };
};
