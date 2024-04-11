import { OverlaySpinner } from '@ankr.com/ui';

import { ECurrency, ENetwork, EPaymentType } from 'modules/billing/types';
import { PaymentInfo } from 'modules/billing/components/PaymentInfo';
import { Placeholder } from 'modules/common/components/Placeholder';
import { SeparatedList } from 'modules/billing/components/SeparatedList';
import { TotalPaymentInfo } from 'modules/billing/components/TotalPaymentInfo';

import {
  IUseTotalFeeDetails,
  useTotalFeeDetails,
} from './hooks/useTotalFeeDetails';
import { InsufficientBalanceAlert } from '../InsufficientBalanceAlert';
import { TxFees } from '../TxFees';

export interface ITxDetailsProps extends IUseTotalFeeDetails {
  amount: number;
  className?: string;
  currency: ECurrency;
  hasEnoughTokenBalance: boolean;
  isWalletConnected: boolean;
  isWalletTokenBalanceLoading: boolean;
  network: ENetwork;
  totalAmount: number;
}

export const TxDetails = ({
  amount,
  approvalFeeDetails,
  className,
  currency,
  depositFeeDetails,
  hasEnoughTokenBalance,
  isWalletConnected,
  isWalletTokenBalanceLoading,
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
      <Placeholder
        hasPlaceholder={isWalletTokenBalanceLoading}
        placeholder={<OverlaySpinner size={58} />}
      >
        <Placeholder
          hasPlaceholder={!hasEnoughTokenBalance}
          placeholder={<InsufficientBalanceAlert />}
        >
          <TxFees
            approvalFeeDetails={approvalFeeDetails}
            depositFeeDetails={depositFeeDetails}
            isWalletConnected={isWalletConnected}
            network={network}
          />
        </Placeholder>
      </Placeholder>
      {isWalletConnected && hasEnoughTokenBalance && (
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
