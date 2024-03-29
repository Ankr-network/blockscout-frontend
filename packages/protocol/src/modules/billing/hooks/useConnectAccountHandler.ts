import { t } from '@ankr.com/common';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isMetamaskError } from 'modules/common/utils/isMetamaskError';

import { connectAccount } from '../utils/connectAccount';

const { showNotification } = NotificationActions;

export const useConnectAccountHandler = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const dispatch = useDispatch();

  const handleConnectAccount = useCallback(async () => {
    const onError = (error: unknown) => {
      const message = isMetamaskError(error)
        ? error.message
        : t('error.common');

      dispatch(showNotification({ message, severity: 'error' }));
    };

    setIsConnecting(true);

    await connectAccount({ onError });

    setIsConnecting(false);
  }, [dispatch]);

  return { handleConnectAccount, isConnecting };
};
