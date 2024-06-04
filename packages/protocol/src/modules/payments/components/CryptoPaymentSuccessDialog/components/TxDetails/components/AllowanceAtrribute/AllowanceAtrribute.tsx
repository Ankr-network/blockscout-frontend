import { t } from '@ankr.com/common';
import { EBlockchain } from 'multirpc-sdk';

import { IFeeDetails } from 'modules/payments/types';
import { FeeAmount } from 'modules/payments/components/FeeAmount';
import { TxAttribute } from 'modules/payments/components/TxAttribute';

export interface IAllowanceAttributeProps {
  feeDetails: IFeeDetails;
  network: EBlockchain;
  txURL?: string;
}

const labelKey = 'account.success-crypto-payment-dialog.approval-label';

export const AllowanceAtrribute = ({
  feeDetails,
  network,
  txURL,
}: IAllowanceAttributeProps) => {
  return (
    <TxAttribute label={t(labelKey)}>
      <FeeAmount
        feeCrypto={feeDetails.feeCrypto}
        feeUSD={feeDetails.feeUSD}
        network={network}
        txURL={txURL}
      />
    </TxAttribute>
  );
};
