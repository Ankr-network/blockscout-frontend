import { OverlaySpinner } from '@ankr.com/ui';

import {
  ECryptoDepositStepStatus,
  ECurrency,
  ENetwork,
  IFeeDetails,
} from 'modules/billing/types';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { FullApprovalAttribute } from './components/FullApprovalAttribute';
import { NoApprovalAttribute } from './components/NoApprovalAttribute';
import { PartialApprovalAttribute } from './components/PartialApprovalAttribute';
import { hasFullApproval } from './utils/hasFullApproval';
import { hasPartialApproval } from './utils/hasPartialApproval';

const defaultFeeData = {
  feeCrypto: 0,
  feeUSD: 0,
};

export interface IApprovalAttributeProps {
  amount: number;
  currency: ECurrency;
  error?: string;
  feeDetails?: IFeeDetails;
  isAllowanceSent: boolean;
  isMyAllowanceLoading: boolean;
  myAllowance: number;
  network: ENetwork;
  status?: ECryptoDepositStepStatus;
}

export const ApprovalAttribute = ({
  amount,
  currency,
  error,
  feeDetails = defaultFeeData,
  isAllowanceSent,
  isMyAllowanceLoading,
  myAllowance,
  network,
  status,
}: IApprovalAttributeProps) => {
  const { amountToDeposit } = useTopUp();

  if (isMyAllowanceLoading) {
    return <OverlaySpinner />;
  }

  if (hasFullApproval({ amountToDeposit, isAllowanceSent, myAllowance })) {
    return (
      <FullApprovalAttribute approvedAmount={myAllowance} currency={currency} />
    );
  }

  if (hasPartialApproval({ amountToDeposit, myAllowance })) {
    return (
      <PartialApprovalAttribute
        amount={amount}
        approvedAmount={myAllowance}
        currency={currency}
        error={error}
        feeCrypto={feeDetails.feeCrypto}
        feeUSD={feeDetails.feeUSD}
        network={network}
        status={status}
      />
    );
  }

  return (
    <NoApprovalAttribute
      error={error}
      feeCrypto={feeDetails.feeCrypto}
      feeUSD={feeDetails.feeUSD}
      network={network}
      status={status}
    />
  );
};
