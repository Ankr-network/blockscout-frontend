import { ErrorProps } from '@redux-requests/react';

import { t } from 'common';

export const ERR_MSG = 'Error: ';

export function getErrorMessage(props: ErrorProps | Error): string {
  if (props instanceof Error) {
    const { message } = props;

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
