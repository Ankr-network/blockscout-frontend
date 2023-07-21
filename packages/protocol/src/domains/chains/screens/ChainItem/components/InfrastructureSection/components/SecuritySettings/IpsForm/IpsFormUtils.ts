import { t } from '@ankr.com/common';

import { isIpAddress } from 'modules/common/utils/isIpAddress';

import { IpsFormData, IpsFormProps } from './IpsFormTypes';

export const validateIp = (value?: string) => {
  if (typeof value !== 'string') {
    return t('validation.required');
  }

  if (!isIpAddress(value)) {
    return t('validation.ip-validation');
  }

  return undefined;
};

export const getInitialValues = (ips: IpsFormProps['data']): IpsFormData => {
  return {
    ips,
  };
};
