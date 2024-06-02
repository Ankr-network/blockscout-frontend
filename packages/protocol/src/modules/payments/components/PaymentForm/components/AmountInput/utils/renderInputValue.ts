import { ECurrency } from 'modules/payments/types';
import { isStablecoin } from 'modules/payments/utils/isStablecoin';
import { renderCryptoAmount } from 'modules/payments/utils/renderCryptoAmount';
import { renderStablecoinPrice } from 'modules/payments/utils/renderStablecoinPrice';
import { renderUSDAmount } from 'modules/payments/utils/renderUSDAmount';
import { renderUSDPrice } from 'modules/payments/utils/renderUSDPrice';

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

  if (isStablecoin(currency)) {
    return renderStablecoinPrice(currency, amount);
  }

  return renderUSDPrice(amount);
};
