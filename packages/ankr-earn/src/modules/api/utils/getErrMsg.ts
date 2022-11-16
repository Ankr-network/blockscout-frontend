import { t } from 'common';

import { parseError } from 'modules/common/utils/parseError';

interface IError {
  message?: string;
}

export type TError = Error | IError | unknown;

const getRawErrMsg = (error: TError): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof (error as IError)?.message === 'string') {
    return (error as IError).message as string;
  }

  return t('error.unknown');
};

export const getErrMsg = (error: TError): string =>
  parseError(getRawErrMsg(error));
