import { ECurrency, IFeeDetails } from 'modules/payments/types';
import { defaultFeeDetails } from 'modules/payments/const';
import { useUsdAmountByCryptoAmount } from 'modules/payments/hooks/useUsdAmountByCryptoAmount';

export interface IUseTotalCryptoAmountProps {
  allowanceFeeDetails?: IFeeDetails;
  amount: number;
  currency: ECurrency;
  depositFeeDetails?: IFeeDetails;
}

export const useTotalCryptoAmount = ({
  allowanceFeeDetails: { feeUSD: allowanceFeeUSD } = defaultFeeDetails,
  amount,
  currency,
  depositFeeDetails: { feeUSD: depositFeeUSD } = defaultFeeDetails,
}: IUseTotalCryptoAmountProps) => {
  const { amountUsd, isLoading } = useUsdAmountByCryptoAmount({
    amount,
    currency,
  });

  const totalAmount = amountUsd + allowanceFeeUSD + depositFeeUSD;

  return { isLoading, totalAmount };
};
