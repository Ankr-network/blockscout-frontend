import { ECurrency, IAmount } from 'modules/billing/types';
import { getRequestsByUSDAmount } from 'modules/billing/utils/getRequestsByUSDAmount';
import { renderCryptoPrice } from 'modules/billing/utils/renderCryptoPrice';
import { renderRequestsAmount } from 'modules/billing/utils/renderRequestsAmount';
import { renderUSDPrice } from 'modules/billing/utils/renderUSDPrice';

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
