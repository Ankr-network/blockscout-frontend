import { EBlockchain } from 'multirpc-sdk';

import { IFeeDetails } from 'modules/payments/types';
import { FeeAmount } from 'modules/payments/components/FeeAmount';
import { TxAttribute } from 'modules/payments/components/TxAttribute';

import { usePartialTxFeeAttributeStyles } from './usePartialTxFeeAttributeStyles';

export interface IPartialTxFeeAttributeProps {
  feeDetails?: IFeeDetails;
  label: string;
  network: EBlockchain;
}

export const PartialTxFeeAttribute = ({
  feeDetails: { feeCrypto, feeUSD } = { feeCrypto: 0, feeUSD: 0 },
  label,
  network,
}: IPartialTxFeeAttributeProps) => {
  const { classes } = usePartialTxFeeAttributeStyles();

  return (
    <TxAttribute classes={classes} label={label} labelVariant="body3">
      <FeeAmount
        amountVariant="body3"
        classes={classes}
        feeCrypto={feeCrypto}
        feeUSD={feeUSD}
        isApproximate
        network={network}
      />
    </TxAttribute>
  );
};
