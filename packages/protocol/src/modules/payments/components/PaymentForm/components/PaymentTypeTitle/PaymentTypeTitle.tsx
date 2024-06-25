import { t, tHTML } from '@ankr.com/common';
import { useMemo } from 'react';

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

  const renderTitle = useMemo(() => {
    return renderer(paymentTypeTitlesMap[paymentType], { isCapitalized });
  }, [isCapitalized, paymentType, renderer]);

  return (
    <>
      {renderTitle}
      {promo && <PromoLabel label={promo} />}
    </>
  );
};
