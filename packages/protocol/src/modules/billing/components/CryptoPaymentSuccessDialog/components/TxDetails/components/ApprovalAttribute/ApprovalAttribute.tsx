import { t } from '@ankr.com/common';

import { ENetwork, IFeeDetails } from 'modules/billing/types';
import { FeeAmount } from 'modules/billing/components/FeeAmount';
import { TxAttribute } from 'modules/billing/components/TxAttribute';

export interface IApprovalAttributeProps {
  feeDetails: IFeeDetails;
  network: ENetwork;
}

const labelKey = 'account.success-crypto-payment-dialog.approval-label';

export const ApprovalAtrribute = ({
  feeDetails,
  network,
}: IApprovalAttributeProps) => {
  return (
    <TxAttribute label={t(labelKey)}>
      <FeeAmount
        feeCrypto={feeDetails.feeCrypto}
        feeUSD={feeDetails.feeUSD}
        network={network}
        txURL={feeDetails.txURL}
      />
    </TxAttribute>
  );
};
