import { t, tHTML } from '@ankr.com/common';

import { EPaymentType } from 'modules/payments/types';
import { PromoLabel } from 'modules/common/components/PromoLabel/PromoLabel';
import { paymentTypeTitlesMap } from 'modules/payments/const';

export interface IRenderPaymentTypeTitleParams {
  isCapitalized?: boolean;
  isHTML?: boolean;
  paymentType: EPaymentType;
  promo?: string;
}

export const PaymentTypeTitle = ({
  isCapitalized,
  isHTML,
  paymentType,
  promo,
}: IRenderPaymentTypeTitleParams) => {
  const renderer = isHTML ? tHTML : t;

  return (
    <>
      {renderer(paymentTypeTitlesMap[paymentType], { isCapitalized })}
      {promo && <PromoLabel label={promo} />}
    </>
  );
};
