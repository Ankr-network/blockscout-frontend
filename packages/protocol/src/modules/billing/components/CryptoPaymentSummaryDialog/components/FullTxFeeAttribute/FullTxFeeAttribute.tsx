import { tHTML } from '@ankr.com/common';

import { ENetwork, IFeeDetails } from 'modules/billing/types';
import { FeeAmount } from 'modules/billing/components/FeeAmount';
import { TxAttribute } from 'modules/billing/components/TxAttribute';

import { useFullTxFeeAttributeStyles } from './useFullTxFeeAttributeStyles';

const labelKey = 'account.payment-summary-dialog.crypto.tx-fees-label';

export interface IFullTxFeeAttributeProps {
  approvalFeeDetails: IFeeDetails;
  depositFeeDetails: IFeeDetails;
  network: ENetwork;
}

export const FullTxFeeAttribute = ({
  approvalFeeDetails,
  depositFeeDetails,
  network,
}: IFullTxFeeAttributeProps) => {
  const feeCrypto = approvalFeeDetails.feeCrypto + depositFeeDetails.feeCrypto;
  const feeUSD = approvalFeeDetails.feeUSD + depositFeeDetails.feeUSD;

  const { classes } = useFullTxFeeAttributeStyles();

  return (
    <TxAttribute classes={classes} label={tHTML(labelKey)}>
      <FeeAmount
        feeCrypto={feeCrypto}
        feeUSD={feeUSD}
        isApproximate
        network={network}
      />
    </TxAttribute>
  );
};
