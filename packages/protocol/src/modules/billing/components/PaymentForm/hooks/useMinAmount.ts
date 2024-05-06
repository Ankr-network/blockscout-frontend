import { EBlockchain, Token } from 'multirpc-sdk';
import BigNumber from 'bignumber.js';

import { ECurrency } from 'modules/billing/types';
import { MIN_ANKR_AMOUNT, MIN_USD_AMOUNT } from 'modules/billing/const';
import { selectPaymentOptions } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

interface IUseMinAmountProps {
  currency: ECurrency;
  network: EBlockchain;
}

export const useMinAmount = ({ currency, network }: IUseMinAmountProps) => {
  const paymentOptionsData = useAppSelector(selectPaymentOptions);

  if (currency === ECurrency.ANKR) {
    return MIN_ANKR_AMOUNT;
  }

  if (currency === ECurrency.USDC || currency === ECurrency.USDT) {
    const networkOptions = paymentOptionsData?.result?.options?.find(
      networkOption => networkOption.blockchain === network,
    );

    const networkTokenOptions = networkOptions?.tokens.find(
      token => token.token_symbol === (currency as unknown as Token),
    );

    if (networkTokenOptions) {
      const { min_amount: minAmount, token_decimals: tokenDecimals } =
        networkTokenOptions;

      return new BigNumber(minAmount).dividedBy(10 ** tokenDecimals).toNumber();
    }
  }

  return MIN_USD_AMOUNT;
};
