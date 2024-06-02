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
  amount: number;
  className?: string;
  currency: ECurrency;
  depositError?: string;
  depositFeeDetails: IFeeDetails;
  depositStatus?: ECryptoDepositStepStatus;
  isAllowanceLoading: boolean;
  isAllowanceSent: boolean;
  isDepositPending: boolean;
  network: EBlockchain;
}

export const PaymentDetails = ({
  allowance,
  allowanceError,
  allowanceFeeDetails,
  allowanceStepStatus,
  amount,
  className,
  currency,
  depositError,
  depositFeeDetails,
  depositStatus,
  isAllowanceLoading,
  isAllowanceSent,
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
        isDepositPending={isDepositPending}
        network={network}
        status={allowanceStepStatus}
      />
      <DepositAttribute
        error={depositError}
        feeDetails={depositFeeDetails}
        network={network}
        status={depositStatus}
      />
      <TotalFeesAttribute
        allowanceFeeDetails={allowanceFeeDetails}
        depositFeeDetails={depositFeeDetails}
        network={network}
      />
    </SeparatedList>
  );
};
