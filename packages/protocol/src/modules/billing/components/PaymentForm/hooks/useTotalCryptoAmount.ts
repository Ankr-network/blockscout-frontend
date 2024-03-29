import { ECurrency, IFeeDetails } from 'modules/billing/types';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';

export interface IUseTotalCryptoAmountProps {
  amount: number;
  approvalFeeDetails: IFeeDetails;
  currency: ECurrency;
  depositFeeDetails: IFeeDetails;
}

export const useTotalCryptoAmount = ({
  amount,
  approvalFeeDetails: { feeUSD: approvalFeeUSD },
  currency,
  depositFeeDetails: { feeUSD: depositFeeUSD },
}: IUseTotalCryptoAmountProps) => {
  const { amountUsd, isLoading } = useUSDAmountByCryptoAmount({
    amount,
    currency,
  });

  const totalAmount = amountUsd + approvalFeeUSD + depositFeeUSD;

  return { isLoading, totalAmount };
};
