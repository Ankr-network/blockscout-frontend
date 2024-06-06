import { hasCreditAmount } from './amountUtils';
import { formatPaymentHistoryAmount } from './formatPaymentHistoryAmount';
import { MAX_CREDIT_DECIMAL_PLACES, MIN_CREDIT_DECIMAL_PLACES } from '../const';

interface GetCreditsValueProps {
  creditUsdAmount: string;
  creditAnkrAmount: string;
  amount: string;
}

export const getCreditsValue = ({
  amount,
  creditAnkrAmount,
  creditUsdAmount,
}: GetCreditsValueProps) => {
  const creditAmount =
    Number(creditUsdAmount) > 0 ? creditUsdAmount : creditAnkrAmount;

  const paymentAmount = hasCreditAmount(creditAnkrAmount, creditUsdAmount)
    ? amount
    : creditAmount;

  const value = formatPaymentHistoryAmount(
    paymentAmount,
    MIN_CREDIT_DECIMAL_PLACES,
    MAX_CREDIT_DECIMAL_PLACES,
  );

  return value;
};
