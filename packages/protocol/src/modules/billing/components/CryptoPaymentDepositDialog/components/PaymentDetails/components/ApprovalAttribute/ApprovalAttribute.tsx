import { useAppSelector } from 'store/useAppSelector';
import {
  selectMyAllowanceLoading,
  selectMyAllowanceValue,
} from 'domains/account/store/selectors';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { FullApprovalAttribute } from './components/FullApprovalAttribute';
import { IApprovalAttributeProps } from './types';
import { NoApprovalAttribute } from './components/NoApprovalAttribute';
import { PartialApprovalAttribute } from './components/PartialApprovalAttribute';

const defaultFeeData = {
  feeCrypto: 0,
  feeUSD: 0,
};

export const ApprovalAttribute = (props: IApprovalAttributeProps) => {
  const { amount, currency, network, feeDetails = defaultFeeData } = props;

  const { amountToDeposit } = useTopUp();

  const alreadyApprovedAllowanceValue = useAppSelector(selectMyAllowanceValue);
  const alreadyApprovedAllowanceLoading = useAppSelector(
    selectMyAllowanceLoading,
  );

  const approvedAmountNumber = Number(alreadyApprovedAllowanceValue);
  const amountToDepositNumber = Number(amountToDeposit);

  const hasNoApproval =
    !alreadyApprovedAllowanceLoading && approvedAmountNumber === 0;

  const hasFullApproval =
    !alreadyApprovedAllowanceLoading &&
    amountToDepositNumber > 0 &&
    amountToDepositNumber === approvedAmountNumber;

  const hasPartialApproval =
    !alreadyApprovedAllowanceLoading &&
    amountToDepositNumber > 0 &&
    amountToDepositNumber !== approvedAmountNumber;

  if (hasNoApproval) {
    const { error, status } = props;

    return (
      <NoApprovalAttribute
        error={error}
        feeCrypto={feeDetails.feeCrypto}
        feeUSD={feeDetails.feeUSD}
        network={network}
        status={status}
      />
    );
  }

  if (hasFullApproval) {
    return (
      <FullApprovalAttribute
        approvedAmount={approvedAmountNumber}
        currency={currency}
      />
    );
  }

  if (hasPartialApproval) {
    const { error, status } = props;

    return (
      <PartialApprovalAttribute
        amount={amount}
        approvedAmount={approvedAmountNumber}
        currency={currency}
        error={error}
        feeCrypto={feeDetails.feeCrypto}
        feeUSD={feeDetails.feeUSD}
        network={network}
        status={status}
      />
    );
  }

  return <></>;
};
