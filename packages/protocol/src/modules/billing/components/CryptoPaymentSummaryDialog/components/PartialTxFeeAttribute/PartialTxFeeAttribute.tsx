import { t } from '@ankr.com/common';

import { ENetwork, IFeeDetails } from 'modules/billing/types';
import { FeeAmount } from 'modules/billing/components/FeeAmount';
import { TxAttribute } from 'modules/billing/components/TxAttribute';

import { usePartialTxFeeAttributeStyles } from './usePartialTxFeeAttributeStyles';

export interface IPartialTxFeeAttributeProps {
  feeDetails: IFeeDetails;
  network: ENetwork;
}

const labelKey = 'account.payment-flow.steps.approval.title';

export const PartialTxFeeAttribute = ({
  feeDetails: { feeCrypto, feeUSD },
  network,
}: IPartialTxFeeAttributeProps) => {
  const { classes } = usePartialTxFeeAttributeStyles();

  return (
    <TxAttribute classes={classes} label={t(labelKey)} labelVariant="body3">
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
