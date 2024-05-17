import { t, tHTML } from '@ankr.com/common';

import { EPaymentType } from 'modules/billing/types';
import { paymentTypeTitlesMap } from 'modules/billing/const';
import { PromoLabel } from 'modules/common/components/PromoLabel/PromoLabel';

export interface IRenderPaymentTypeTitleParams {
  isCapitalized?: boolean;
  isHTML?: boolean;
  paymentType: EPaymentType;
  promo?: string;
}

export const PaymentTypeTitle = ({
  isCapitalized,
  paymentType,
  isHTML,
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
