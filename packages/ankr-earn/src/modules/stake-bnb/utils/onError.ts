import { t } from '@ankr.com/common';
import { SerializedError } from '@reduxjs/toolkit';

import { EBinanceErrorCodes } from '@ankr.com/staking-sdk';

export const onError = (error: SerializedError): string => {
  if (!error?.message) {
    return t('error.unknown');
  }

  if (error.message.includes(EBinanceErrorCodes.LOW_BALANCE_FOR_GAS_FEE)) {
    return t('validation.insufficient-funds-for-transfer');
  }

  return error.message;
};
