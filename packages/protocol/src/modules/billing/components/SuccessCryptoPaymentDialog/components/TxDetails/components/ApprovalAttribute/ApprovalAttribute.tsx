import { t } from '@ankr.com/common';

import { ENetwork } from 'modules/billing/types';
import { IApprovalDetails } from 'modules/billing/components/SuccessCryptoPaymentDialog/types';

import { FeeAmount } from '../FeeAmount';
import { TxAttribute } from '../TxAttribute';

export interface IApprovalAttributeProps {
  approval: IApprovalDetails;
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
        fee={approval.fee}
        feeUSD={approval.feeUSD}
        network={network}
        txURL={approval.txURL}
      />
    </TxAttribute>
  );
};
