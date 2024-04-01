import { t } from '@ankr.com/common';

import { ENetwork, IFeeDetails } from 'modules/billing/types';
import { FeeAmount } from 'modules/billing/components/FeeAmount';
import { TxAttribute } from 'modules/billing/components/TxAttribute';

export interface IApprovalAttributeProps {
  approval: IFeeDetails;
  network: ENetwork;
}

const labelKey = 'account.success-crypto-payment-dialog.approval-label';

export const ApprovalAtrribute = ({
  approval,
  network,
}: IApprovalAttributeProps) => {
  return (
    <TxAttribute label={t(labelKey)}>
      <FeeAmount
        feeCrypto={approval.feeCrypto}
        feeUSD={approval.feeUSD}
        network={network}
        txURL={approval.txURL}
      />
    </TxAttribute>
  );
};
