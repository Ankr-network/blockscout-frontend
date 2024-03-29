import { ENetwork, IFeeDetails } from 'modules/billing/types';
import { FeeAmount } from 'modules/billing/components/FeeAmount';
import { TxAttribute } from 'modules/billing/components/TxAttribute';

import { usePartialTxFeeAttributeStyles } from './usePartialTxFeeAttributeStyles';

export interface IPartialTxFeeAttributeProps {
  feeDetails: IFeeDetails;
  label: string;
  network: ENetwork;
}

export const PartialTxFeeAttribute = ({
  feeDetails: { feeCrypto, feeUSD },
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
