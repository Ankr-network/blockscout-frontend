import { t } from '@ankr.com/common';

import { ENetwork, IFeeDetails } from 'modules/billing/types';
import { FeeAmount } from 'modules/billing/components/FeeAmount';
import { TxAttribute } from 'modules/billing/components/TxAttribute';

export interface ITotalFeesAttributeProps {
  approvalFeeDetails?: IFeeDetails;
  depositFeeDetails: IFeeDetails;
  network: ENetwork;
}

const defaultApprovalFeeDetails: IFeeDetails = {
  feeCrypto: 0,
  feeUSD: 0,
};

const labelKey = 'account.crypto-payment-deposit-dialog.total-fees-label';

export const TotalFeesAttribute = ({
  approvalFeeDetails = defaultApprovalFeeDetails,
  depositFeeDetails,
  network,
}: ITotalFeesAttributeProps) => {
  const feeCrypto = approvalFeeDetails.feeCrypto + depositFeeDetails.feeCrypto;
  const feeUSD = approvalFeeDetails.feeUSD + depositFeeDetails.feeUSD;

  return (
    <TxAttribute label={t(labelKey)} labelVariant="subtitle2">
      <FeeAmount
        amountVariant="subtitle2"
        feeCrypto={feeCrypto}
        feeUSD={feeUSD}
        isApproximate
        network={network}
      />
    </TxAttribute>
  );
};
