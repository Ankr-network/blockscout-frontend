import { queryFnWrapper } from '@ankr.com/utils';

import { t } from 'common';

import { showNotification } from 'modules/notifications';

type TError = Error | IError | unknown;

interface IError {
  message?: string;
}

const getErrMsg = (error: TError): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof (error as IError)?.message === 'string') {
    return (error as IError).message as string;
  }

  return t('error.unknown');
};

export const queryFnNotifyWrapper = queryFnWrapper({
  onNotification({ api, error, uuid, onError }) {
    const errMsg =
      typeof onError === 'function'
        ? onError(error)
        : getErrMsg(error as TError);

    api.dispatch(
      showNotification({
        key: `${uuid}_ERROR`,
        message: `Error: ${errMsg}`,
        variant: 'error',
      }),
    );
  },
});
