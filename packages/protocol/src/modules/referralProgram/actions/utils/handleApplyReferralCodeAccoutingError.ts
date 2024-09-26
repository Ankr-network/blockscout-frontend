import { AccountingErrorCode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { ApplyReferralCodeErrorCode } from 'modules/referralProgram/const';
import { isAxiosAccountingError } from 'store/utils/isAxiosAccountingError';

export const handleApplyReferralCodeAccountingError = (exception: unknown) => {
  if (isAxiosAccountingError(exception)) {
    const error = exception.response?.data.error;

    // to change error message
    if (error?.code === AccountingErrorCode.NotFound) {
      throw new Error(t('error.wrong-referral-code'));
    }

    if (error?.code === AccountingErrorCode.AlreadyExists) {
      // returning error instead of throwing it allows handling
      // the error in onQueryStarted fn instead of
      // raising it to the notifying query fn
      return {
        error: new Error(ApplyReferralCodeErrorCode.ALREADY_USED),
      };
    }
  }

  throw exception;
};
