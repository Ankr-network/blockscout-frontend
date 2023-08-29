import { AccountingErrorCode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { isAxiosAccountingError } from 'store/utils/isAxiosAccountingError';

import { ErrorMessageGetter } from '../types';
import { getAccountErrorMessage } from './getAccountErrorMessage';
import { getUnknownErrorMessage } from './getUnknownErrorMessage';

const messageGettersMap: Record<AccountingErrorCode, ErrorMessageGetter> = {
  [AccountingErrorCode.Aborted]: getAccountErrorMessage,
  [AccountingErrorCode.AlreadyExists]: () =>
    t('user-settings.errors.address-pending-other-email-binding'),
  [AccountingErrorCode.DatabaseError]: getAccountErrorMessage,
  [AccountingErrorCode.FailedPrecondition]: getAccountErrorMessage,
  [AccountingErrorCode.InternalError]: getAccountErrorMessage,
  [AccountingErrorCode.InvalidArgument]: getAccountErrorMessage,
  [AccountingErrorCode.NothingTodo]: () =>
    t('user-settings.errors.change-with-same-email'),
  [AccountingErrorCode.Unavailable]: getAccountErrorMessage,
  [AccountingErrorCode.WrongFormat]: getAccountErrorMessage,
  [AccountingErrorCode.WrongState]: () =>
    t('user-settings.errors.too-many-change-email-requests', {
      minutes: 1,
      plural: '',
    }),
  [AccountingErrorCode.NotFound]: () =>
    t('user-settings.errors.change-inexistent'),
  [AccountingErrorCode.TwoFARequired]: () => '',
  [AccountingErrorCode.TwoFAWrong]: () => '',
  [AccountingErrorCode.InsufficientBalance]: () => '',
};

export const getEditEmailErrorMessage = (error: unknown, email?: string) =>
  isAxiosAccountingError(error) && error.response?.data.error.code
    ? messageGettersMap[error.response?.data.error.code](error, email)
    : getUnknownErrorMessage(error);
