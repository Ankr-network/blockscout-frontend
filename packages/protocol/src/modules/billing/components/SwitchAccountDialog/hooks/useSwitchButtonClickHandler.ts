import { t } from '@ankr.com/common';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isMetamaskError } from 'modules/common/utils/isMetamaskError';
import { connectAccount } from 'modules/billing/utils/connectAccount';

const { showNotification } = NotificationActions;

export const useSwitchButtonClickHandler = () => {
  const [isSwitching, setIsSwitching] = useState(false);

  const dispatch = useDispatch();

  const onSwitchButtonClick = useCallback(async () => {
    const onError = (error: unknown) => {
      const message = isMetamaskError(error)
        ? error.message
        : t('error.common');

      dispatch(showNotification({ message, severity: 'error' }));
    };

    setIsSwitching(true);

    await connectAccount({ onError });

    setIsSwitching(false);
  }, [dispatch]);

  return { isSwitching, onSwitchButtonClick };
};
