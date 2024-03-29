import { ECurrency, ENetwork, EPaymentType } from 'modules/billing/types';
import { PaymentInfo } from 'modules/billing/components/PaymentInfo';
import { SeparatedList } from 'modules/billing/components/SeparatedList';
import { TotalPaymentInfo } from 'modules/billing/components/TotalPaymentInfo';

import {
  IUseTotalFeeDetails,
  useTotalFeeDetails,
} from './hooks/useTotalFeeDetails';
import { TxFees } from '../TxFees';

export interface ITxDetailsProps extends IUseTotalFeeDetails {
  amount: number;
  className?: string;
  currency: ECurrency;
  isWalletConnected: boolean;
  network: ENetwork;
  totalAmount: number;
}

export const TxDetails = ({
  amount,
  approvalFeeDetails,
  className,
  currency,
  depositFeeDetails,
  isWalletConnected,
  network,
  totalAmount,
}: ITxDetailsProps) => {
  const totalFeeDetails = useTotalFeeDetails({
    approvalFeeDetails,
    depositFeeDetails,
  });

  return (
    <SeparatedList className={className}>
      <PaymentInfo
        amount={amount}
        currency={currency}
        paymentType={EPaymentType.OneTime}
      />
      <TxFees
        approvalFeeDetails={approvalFeeDetails}
        depositFeeDetails={depositFeeDetails}
        isWalletConnected={isWalletConnected}
        network={network}
      />
      {isWalletConnected && (
        <TotalPaymentInfo
          amount={amount}
          currency={currency}
          feeDetails={totalFeeDetails}
          network={network}
          totalAmount={totalAmount}
        />
      )}
    </SeparatedList>
  );
};
