import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { EBlockchain } from 'multirpc-sdk';

import { IFeeDetails } from 'modules/payments/types';
import { FeeAmount } from 'modules/payments/components/FeeAmount';
import { TxAttribute } from 'modules/payments/components/TxAttribute';

import { useFullTxFeeAttributeStyles } from './useFullTxFeeAttributeStyles';
import { useTotalFeeDetails } from '../TxDetails/hooks/useTotalFeeDetails';

const labelKey = 'account.payment-summary-dialog.crypto.tx-fees-label';
const placeholderKey =
  'account.payment-summary-dialog.crypto.tx-fees-placeholder';

export interface IFullTxFeeAttributeProps {
  allowanceFeeDetails?: IFeeDetails;
  depositFeeDetails?: IFeeDetails;
  isWalletConnected: boolean;
  network: EBlockchain;
}

export const FullTxFeeAttribute = ({
  allowanceFeeDetails,
  depositFeeDetails,
  isWalletConnected,
  network,
}: IFullTxFeeAttributeProps) => {
  const { feeCrypto, feeUSD } = useTotalFeeDetails({
    allowanceFeeDetails,
    depositFeeDetails,
  });

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
