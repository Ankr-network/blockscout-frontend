import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { EBlockchain } from 'multirpc-sdk';

import { IFeeDetails } from 'modules/billing/types';
import { FeeAmount } from 'modules/billing/components/FeeAmount';
import { TxAttribute } from 'modules/billing/components/TxAttribute';
import { sumAmountsWithRoundUp } from 'modules/billing/utils/sumAmountsWithRoundUp';
import { CRYPTO_DECIMALS, USD_DECIMALS } from 'modules/common/constants/const';

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
  const feeCrypto = sumAmountsWithRoundUp(
    approvalFeeDetails.feeCrypto,
    depositFeeDetails.feeCrypto,
    CRYPTO_DECIMALS,
  );
  const feeUSD = sumAmountsWithRoundUp(
    approvalFeeDetails.feeUSD,
    depositFeeDetails.feeUSD,
    USD_DECIMALS,
  );

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
