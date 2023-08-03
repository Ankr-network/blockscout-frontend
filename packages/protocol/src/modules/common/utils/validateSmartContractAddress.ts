import { t } from '@ankr.com/common';
import { utils } from 'ethers';

export const validateSmartContractAddress = (value: string) => {
  if (typeof value !== 'string') {
    return t('validation.required');
  }

  if (!utils.isAddress(value)) {
    return t('validation.smart-contract-address-validation');
  }

  return undefined;
};
