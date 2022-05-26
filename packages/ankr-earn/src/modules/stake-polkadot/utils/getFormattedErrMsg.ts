import { t } from 'common';

import {
  EErrorCodes,
  IPolkadotStakeSDKError,
  IPolkadotStakeSDKErrorPayload,
} from '../api/PolkadotStakeSDK';

export interface IError
  extends Omit<IPolkadotStakeSDKError, 'code' | 'payload'> {
  code?: EErrorCodes;
  payload?: IPolkadotStakeSDKErrorPayload;
}

const ERR_MSG = 'Error: ';

export const getFormattedErrMsg = ({
  code,
  message,
  payload,
}: IError): string => {
  const defaultMsg = t('error.unknown');

  if (
    typeof code !== 'string' ||
    typeof payload !== 'object' ||
    message.includes(ERR_MSG)
  ) {
    return message.replace(ERR_MSG, '');
  }

  switch (code) {
    case EErrorCodes.StakeNotCompleted: {
      const { id, status } = payload;

      if (typeof id !== 'string' || typeof status !== 'string') {
        return defaultMsg;
      }

      return t('stake-polkadot.errors.uncompleted-stake-transaction', {
        id,
        status,
      });
    }

    default: {
      return defaultMsg;
    }
  }
};
