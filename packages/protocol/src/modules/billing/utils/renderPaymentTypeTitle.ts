import { t, tHTML } from '@ankr.com/common';

import { EPaymentType } from '../types';
import { paymentTypeTitlesMap } from '../const';

export interface IRenderPaymentTypeTitleParams {
  isCapitalized?: boolean;
  isHTML?: boolean;
  paymentType: EPaymentType;
}

export const renderPaymentTypeTitle = ({
  isCapitalized,
  paymentType,
  isHTML,
}: IRenderPaymentTypeTitleParams) => {
  const renderer = isHTML ? tHTML : t;

  return renderer(paymentTypeTitlesMap[paymentType], { isCapitalized });
};
