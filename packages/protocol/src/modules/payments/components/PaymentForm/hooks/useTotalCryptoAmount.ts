import { ECurrency, IFeeDetails } from 'modules/payments/types';
import { defaultFeeDetails } from 'modules/payments/const';
import { useUSDAmountByCryptoAmount } from 'modules/payments/hooks/useUSDAmountByCryptoAmount';

export interface IUseTotalCryptoAmountProps {
  allowanceFeeDetails?: IFeeDetails;
  amount: number;
  currency: ECurrency;
  depositFeeDetails?: IFeeDetails;
}

export const useTotalCryptoAmount = ({
  allowanceFeeDetails: { feeUSD: approvalFeeUSD } = defaultFeeDetails,
  amount,
  currency,
  depositFeeDetails: { feeUSD: depositFeeUSD } = defaultFeeDetails,
}: IUseTotalCryptoAmountProps) => {
  const { amountUsd, isLoading } = useUSDAmountByCryptoAmount({
    amount,
    currency,
  });

  const totalAmount = amountUsd + approvalFeeUSD + depositFeeUSD;

  return { isLoading, totalAmount };
};
