import { t } from '@ankr.com/common';
import { SerializedError } from '@reduxjs/toolkit';

import { EEthereumErrorCodes } from '@ankr.com/staking-sdk';

export const onError = (error: SerializedError): string => {
  if (!error?.message) {
    return t('error.unknown');
  }

  if (error.message.includes(EEthereumErrorCodes.NOT_ENOUGH_FUNDS)) {
    return t('validation.insufficient-funds-for-transfer');
  }

  return error.message;
};
