import { ECurrency } from 'modules/billing/types';
import { renderCryptoAmount } from 'modules/billing/utils/renderCryptoAmount';
import { renderUSDAmount } from 'modules/billing/utils/renderUSDAmount';
import { renderUSDPrice } from 'modules/billing/utils/renderUSDPrice';

export interface IRenderInputValueParams {
  amount: number;
  currency: ECurrency;
  amountUsd: number;
}

export const renderInputValue = ({
  amount,
  currency,
  amountUsd,
}: IRenderInputValueParams) => {
  const isANKR = currency === ECurrency.ANKR;

  if (isANKR) {
    const amountString = renderCryptoAmount({ amount, currency });
    const usdAmountString = renderUSDAmount({
      amount: amountUsd,
      isApproximate: true,
    });

    return `${amountString} / ${usdAmountString}`;
  }

  return renderUSDPrice(amount);
};
