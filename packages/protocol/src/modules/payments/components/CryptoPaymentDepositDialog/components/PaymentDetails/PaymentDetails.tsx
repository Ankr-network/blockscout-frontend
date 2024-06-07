import { EBlockchain } from 'multirpc-sdk';

import {
  ECryptoDepositStepStatus,
  ECurrency,
  IFeeDetails,
} from 'modules/payments/types';
import { SeparatedList } from 'modules/payments/components/SeparatedList';

import { AllowanceAttribute } from './components/AllowanceAttribute';
import { DepositAttribute } from './components/DepositAttribute';
import { TotalFeesAttribute } from './components/TotalFeesAttribute';

export interface IPaymentDetailsProps {
  allowance: number;
  allowanceError?: string;
  allowanceFeeDetails?: IFeeDetails;
  allowanceStepStatus?: ECryptoDepositStepStatus;
  allowanceTxHash?: string;
  amount: number;
  className?: string;
  currency: ECurrency;
  depositError?: string;
  depositFeeDetails: IFeeDetails;
  depositStepStatus?: ECryptoDepositStepStatus;
  depositTxHash?: string;
  isAllowanceLoading: boolean;
  isAllowanceSent: boolean;
  isDepositConfirming: boolean;
  isDepositPending: boolean;
  network: EBlockchain;
}

export const PaymentDetails = ({
  allowance,
  allowanceError,
  allowanceFeeDetails,
  allowanceStepStatus,
  allowanceTxHash,
  amount,
  className,
  currency,
  depositError,
  depositFeeDetails,
  depositStepStatus,
  depositTxHash,
  isAllowanceLoading,
  isAllowanceSent,
  isDepositConfirming,
  isDepositPending,
  network,
}: IPaymentDetailsProps) => {
  return (
    <SeparatedList className={className}>
      <AllowanceAttribute
        allowance={allowance}
        amount={amount}
        currency={currency}
        error={allowanceError}
        feeDetails={allowanceFeeDetails}
        isAllowanceLoading={isAllowanceLoading}
        isAllowanceSent={isAllowanceSent}
        isDepositConfirming={isDepositConfirming}
        isDepositPending={isDepositPending}
        network={network}
        status={allowanceStepStatus}
        txHash={allowanceTxHash}
      />
      <DepositAttribute
        error={depositError}
        feeDetails={depositFeeDetails}
        network={network}
        status={depositStepStatus}
        txHash={depositTxHash}
      />
      <TotalFeesAttribute
        allowanceFeeDetails={allowanceFeeDetails}
        depositFeeDetails={depositFeeDetails}
        network={network}
      />
    </SeparatedList>
  );
};
