import {
  ECryptoDepositStepStatus,
  ECurrency,
  ENetwork,
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
  approvedAmount?: number;
  className?: string;
  currency: ECurrency;
  depositError?: string;
  depositFeeDetails: IFeeDetails;
  depositStatus?: ECryptoDepositStepStatus;
  network: ENetwork;
}

export const PaymentDetails = ({
  amount,
  approvalError,
  approvalFeeDetails,
  approvalStatus,
  approvedAmount,
  className,
  currency,
  depositError,
  depositFeeDetails,
  depositStatus,
  network,
}: IPaymentDetailsProps) => {
  return (
    <SeparatedList className={className}>
      <ApprovalAttribute
        amount={amount}
        approvedAmount={approvedAmount}
        currency={currency}
        error={approvalError}
        feeDetails={approvalFeeDetails}
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
