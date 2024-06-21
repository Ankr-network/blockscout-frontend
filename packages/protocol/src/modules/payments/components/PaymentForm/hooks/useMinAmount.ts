import { EBlockchain } from 'multirpc-sdk';

import { ECurrency } from 'modules/payments/types';
import { MIN_ANKR_AMOUNT, MIN_USD_AMOUNT } from 'modules/payments/const';
import { isStablecoin } from 'modules/payments/utils/isStablecoin';
import { selectMinCryptoPaymentAmount } from 'modules/payments/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export interface IUseMinAmountProps {
  currency: ECurrency;
  network: EBlockchain;
}

export const useMinAmount = ({ currency, network }: IUseMinAmountProps) => {
  const minAmount = useAppSelector(state =>
    selectMinCryptoPaymentAmount(state, currency, network),
  );

  if (currency === ECurrency.ANKR) {
    return MIN_ANKR_AMOUNT;
  }

  if (isStablecoin(currency)) {
    return minAmount;
  }

  return MIN_USD_AMOUNT;
};
