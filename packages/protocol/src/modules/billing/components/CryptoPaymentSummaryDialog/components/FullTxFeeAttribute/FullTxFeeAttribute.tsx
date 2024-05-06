import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { EBlockchain } from 'multirpc-sdk';

import { IFeeDetails } from 'modules/billing/types';
import { FeeAmount } from 'modules/billing/components/FeeAmount';
import { TxAttribute } from 'modules/billing/components/TxAttribute';

import { useFullTxFeeAttributeStyles } from './useFullTxFeeAttributeStyles';

const labelKey = 'account.payment-summary-dialog.crypto.tx-fees-label';
const placeholderKey =
  'account.payment-summary-dialog.crypto.tx-fees-placeholder';

export interface IFullTxFeeAttributeProps {
  approvalFeeDetails: IFeeDetails;
  depositFeeDetails: IFeeDetails;
  isWalletConnected: boolean;
  network: EBlockchain;
}

export const FullTxFeeAttribute = ({
  approvalFeeDetails,
  depositFeeDetails,
  isWalletConnected,
  network,
}: IFullTxFeeAttributeProps) => {
  const feeCrypto = approvalFeeDetails.feeCrypto + depositFeeDetails.feeCrypto;
  const feeUSD = approvalFeeDetails.feeUSD + depositFeeDetails.feeUSD;

  const { classes } = useFullTxFeeAttributeStyles();

  const feeAmount = (
    <FeeAmount
      feeCrypto={feeCrypto}
      feeUSD={feeUSD}
      isApproximate
      network={network}
    />
  );

  const feePlaceholder = (
    <Typography className={classes.placeholder} variant="body2">
      {t(placeholderKey)}
    </Typography>
  );

  return (
    <TxAttribute classes={classes} label={tHTML(labelKey)}>
      {isWalletConnected ? feeAmount : feePlaceholder}
    </TxAttribute>
  );
};
