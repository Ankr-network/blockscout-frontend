import { ErrorProps } from '@redux-requests/react';
import capitalize from 'lodash/capitalize';

import { t } from 'common';

export interface RequestError extends Error {
  code?: number;
}

export const ERR_MSG = 'Error: ';

export const METAMASK_INSUFFICIENT_FUNDS_ERROR_MESSAGE =
  'insufficient funds for transfer';
export const METAMASK_USER_REJECT_ERROR_CODE = 4001;

export const formatError = (error: RequestError): Error => {
  const [message, , , codeMsg] = error.message.split('\n');

  if (codeMsg?.includes(METAMASK_INSUFFICIENT_FUNDS_ERROR_MESSAGE)) {
    return new Error(capitalize(METAMASK_INSUFFICIENT_FUNDS_ERROR_MESSAGE));
  }

  return new Error(message || error.message);
};

export const onTransactionError = (error: RequestError): void => {
  throw formatError(error);
};

export function getErrorMessage(props: ErrorProps | Error): string {
  if (props instanceof Error) {
    const formattedError = formatError(props);
    const { message } = formattedError;

    return message.includes(ERR_MSG) ? message.replace(ERR_MSG, '') : message;
  }

  if (props.message) {
    return props.message;
  }

  if (typeof props.error?.error === 'string') {
    return props.error.error;
  }

  if (typeof props.error?.error === 'object') {
    return props.error?.error.message;
  }

  if (typeof props.error?.response?.data?.message === 'string') {
    return props.error.response.data.message;
  }

  if (typeof props.error?.message === 'string') {
    return props.error.message;
  }

  if (props.error?.toString) {
    return props.error.toString();
  }

  return t('error.unknown');
}
