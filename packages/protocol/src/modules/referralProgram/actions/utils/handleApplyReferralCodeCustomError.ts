import { t } from '@ankr.com/common';

import { AppDispatch } from 'store';
import { ApplyReferralCodeErrorCode } from 'modules/referralProgram/const';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isHandledQueryError } from 'store/utils/isHandledQueryError';

export interface IHandleApplyReferralCodeErrorParams {
  dispatch: AppDispatch;
  exception: unknown;
}

const { showNotification } = NotificationActions;

export const handleApplyReferralCodeCustomError = ({
  dispatch,
  exception,
}: IHandleApplyReferralCodeErrorParams) => {
  if (isHandledQueryError(exception)) {
    const { error } = exception;

    if (error instanceof Error) {
      const code = error.message;

      if (code === ApplyReferralCodeErrorCode.ALREADY_USED) {
        dispatch(
          showNotification({
            message: t('error.referral-code-already-used.message'),
            severity: 'error',
            title: t('error.referral-code-already-used.title'),
          }),
        );

        return;
      }

      if (code === ApplyReferralCodeErrorCode.EXPIRED) {
        dispatch(
          showNotification({
            message: t('error.referral-code-expired.message'),
            severity: 'error',
            title: t('error.referral-code-expired.title'),
          }),
        );

        return;
      }
    }
  }

  throw exception;
};
