import { AccountErrorCode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { ErrorMessageGetter } from '../types';
import { getAccountErrorMessage } from './getAccountErrorMessage';
import { getUnknownErrorMessage } from './getUnknownErrorMessage';
import { isAxiosAccountError } from 'store/utils/isAxiosAccountError';

const messageGettersMap: Record<AccountErrorCode, ErrorMessageGetter> = {
  [AccountErrorCode.Aborted]: getAccountErrorMessage,
  [AccountErrorCode.AlreadyExists]: () =>
    t('user-settings.errors.address-pending-other-email-binding'),
  [AccountErrorCode.DatabaseError]: getAccountErrorMessage,
  [AccountErrorCode.FailedPrecondition]: getAccountErrorMessage,
  [AccountErrorCode.InternalError]: getAccountErrorMessage,
  [AccountErrorCode.InvalidArgument]: getAccountErrorMessage,
  [AccountErrorCode.NothingTodo]: () =>
    t('user-settings.errors.change-with-same-email'),
  [AccountErrorCode.Unavailable]: getAccountErrorMessage,
  [AccountErrorCode.WrongFormat]: getAccountErrorMessage,
  [AccountErrorCode.WrongState]: () =>
    t('user-settings.errors.too-many-change-email-requests', {
      minutes: 1,
      plural: '',
    }),
  [AccountErrorCode.NotFound]: () =>
    t('user-settings.errors.change-inexistent'),
};

export const getEditEmailErrorMessage = (error: unknown, email?: string) =>
  isAxiosAccountError(error) && error.response?.data.error.code
    ? messageGettersMap[error.response?.data.error.code](error, email)
    : getUnknownErrorMessage(error);
