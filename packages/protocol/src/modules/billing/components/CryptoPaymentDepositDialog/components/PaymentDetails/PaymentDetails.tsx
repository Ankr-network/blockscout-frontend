import { EBlockchain } from 'multirpc-sdk';

import {
  ECryptoDepositStepStatus,
  ECurrency,
  IFeeDetails,
} from 'modules/billing/types';
import { SeparatedList } from 'modules/billing/components/SeparatedList';

import { ApprovalAttribute } from './components/ApprovalAttribute';
import { DepositAttribute } from './components/DepositAttribute';
import { TotalFeesAttribute } from './components/TotalFeesAttribute';

export interface IPaymentDetailsProps {
  amount: number;
  approvalError?: string;
  approvalFeeDetails?: IFeeDetails;
  approvalStatus?: ECryptoDepositStepStatus;
  className?: string;
  currency: ECurrency;
  depositError?: string;
  depositFeeDetails: IFeeDetails;
  depositStatus?: ECryptoDepositStepStatus;
  isAllowanceSent: boolean;
  isMyAllowanceLoading: boolean;
  myAllowance: number;
  network: EBlockchain;
}

export const PaymentDetails = ({
  amount,
  approvalError,
  approvalFeeDetails,
  approvalStatus,
  className,
  currency,
  depositError,
  depositFeeDetails,
  depositStatus,
  isAllowanceSent,
  isMyAllowanceLoading,
  myAllowance,
  network,
}: IPaymentDetailsProps) => {
  return (
    <SeparatedList className={className}>
      <ApprovalAttribute
        amount={amount}
        currency={currency}
        error={approvalError}
        feeDetails={approvalFeeDetails}
        isAllowanceSent={isAllowanceSent}
        isMyAllowanceLoading={isMyAllowanceLoading}
        myAllowance={myAllowance}
        network={network}
        status={approvalStatus}
      />
      <DepositAttribute
        error={depositError}
        feeDetails={depositFeeDetails}
        network={network}
        status={depositStatus}
      />
      <TotalFeesAttribute
        approvalFeeDetails={approvalFeeDetails}
        depositFeeDetails={depositFeeDetails}
        network={network}
      />
    </SeparatedList>
  );
};
