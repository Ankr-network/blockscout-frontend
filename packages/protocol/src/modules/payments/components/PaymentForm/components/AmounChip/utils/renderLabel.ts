import { ECurrency, IAmount } from 'modules/payments/types';
import { getRequestsByUSDAmount } from 'modules/payments/utils/getRequestsByUSDAmount';
import { renderCryptoPrice } from 'modules/payments/utils/renderCryptoPrice';
import { renderRequestsAmount } from 'modules/payments/utils/renderRequestsAmount';
import { renderUSDPrice } from 'modules/payments/utils/renderUSDPrice';

export interface IRenderLabelParams extends IAmount {
  isSelected?: boolean;
  shouldDisplayRequestsWhenSelected?: boolean;
}

export const renderLabel = ({
  currency,
  isSelected,
  shouldDisplayRequestsWhenSelected,
  value,
}: IRenderLabelParams) => {
  const isUSD = currency === ECurrency.USD;

  if (isUSD) {
    const amount = renderUSDPrice(value);

    if (isSelected && shouldDisplayRequestsWhenSelected) {
      const requests = getRequestsByUSDAmount(value);
      const requestsAmount = renderRequestsAmount({
        isApproximate: true,
        requests,
      });

      return `${amount}/${requestsAmount}`;
    }

    return amount;
  }

  return renderCryptoPrice({ amount: value, currency });
};
