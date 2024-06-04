import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isMetamaskError } from 'modules/common/utils/isMetamaskError';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';

import { useConnectWalletAccountMutation } from '../actions/connectWalletAccount';

const { showNotification } = NotificationActions;

export interface IUseConnectWalletAccountProps {
  onSuccess?: (connectedAddress: string) => void;
}

export const useConnectWalletAccount = ({
  onSuccess,
}: IUseConnectWalletAccountProps | void = {}) => {
  const [connectAccount, { isLoading: isConnecting }] =
    useConnectWalletAccountMutation();

  const dispatch = useDispatch();

  const handleConnectWalletAccount = useCallback(async () => {
    const result = await connectAccount();

    if (isMutationSuccessful(result)) {
      const { data: connectedAddress } = result;

      if (connectedAddress) {
        onSuccess?.(connectedAddress);
      } else {
        dispatch(
          showNotification({
            message: t('error.no-metamask'),
            severity: 'error',
          }),
        );
      }
    } else {
      const { error } = result;

      const message = isMetamaskError(error)
        ? error.message
        : t('error.common');

      dispatch(showNotification({ message, severity: 'error' }));
    }
  }, [connectAccount, dispatch, onSuccess]);

  return { handleConnectWalletAccount, isConnecting };
};
