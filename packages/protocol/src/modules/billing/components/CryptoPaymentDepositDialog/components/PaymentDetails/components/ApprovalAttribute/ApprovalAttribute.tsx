import { FullApprovalAttribute } from './components/FullApprovalAttribute';
import { IApprovalAttributeProps } from './types';
import { NoApprovalAttribute } from './components/NoApprovalAttribute';
import { PartialApprovalAttribute } from './components/PartialApprovalAttribute';
import { hasFullApproval } from './utils/hasFullApproval';
import { hasNoApproval } from './utils/hasNoApproval';
import { hasPartialApproval } from './utils/hasPartialApproval';

export const ApprovalAttribute = (props: IApprovalAttributeProps) => {
  const { amount, currency, network } = props;

  if (hasNoApproval(props)) {
    const {
      error,
      feeDetails: { feeCrypto, feeUSD },
      status,
    } = props;

    return (
      <NoApprovalAttribute
        error={error}
        feeCrypto={feeCrypto}
        feeUSD={feeUSD}
        network={network}
        status={status}
      />
    );
  }

  if (hasFullApproval(props)) {
    const { approvedAmount } = props;

    return (
      <FullApprovalAttribute
        approvedAmount={approvedAmount}
        currency={currency}
      />
    );
  }

  if (hasPartialApproval(props)) {
    const { approvedAmount, error, feeDetails, status } = props;
    const { feeCrypto, feeUSD } = feeDetails;

    return (
      <PartialApprovalAttribute
        amount={amount}
        approvedAmount={approvedAmount}
        currency={currency}
        error={error}
        feeCrypto={feeCrypto}
        feeUSD={feeUSD}
        network={network}
        status={status}
      />
    );
  }

  return <></>;
};
