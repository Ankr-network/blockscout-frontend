import { useCallback } from 'react';
import BigNumber from 'bignumber.js';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { useAppDispatch } from 'store/useAppDispatch';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { topUpPAYGBalanceDialogTranslation } from '../translation';

const { showNotification } = NotificationActions;

export interface IUseNotificationsProps {
  amount?: number;
}

export const useNotifications = ({ amount = 0 }: IUseNotificationsProps) => {
  const { keys, t } = useTranslation(topUpPAYGBalanceDialogTranslation);

  const dispatch = useAppDispatch();

  const showSuccessAlert = useCallback(() => {
    const message = t(keys.successfulTopUpAlertMessage, {
      amount: new BigNumber(amount).toFormat(),
    });
    const title = t(keys.successfulTopUpAlertTitle);

    dispatch(showNotification({ message, severity: 'success', title }));
  }, [amount, dispatch, keys, t]);

  const showFailureAlert = useCallback(() => {
    const message = t(keys.successfulTopUpAlertMessage);
    const title = t(keys.successfulTopUpAlertTitle);

    dispatch(showNotification({ message, severity: 'success', title }));
  }, [dispatch, keys, t]);

  return { showFailureAlert, showSuccessAlert };
};
