import { t } from '@ankr.com/common';

import {
  FullTxFeeAttribute,
  IFullTxFeeAttributeProps,
} from '../FullTxFeeAttribute';
import { PartialTxFeeAttribute } from '../PartialTxFeeAttribute';
import { useTxFeesStyles } from './useTxFeesStyles';

export interface ITxFeesProps extends IFullTxFeeAttributeProps {}

export const TxFees = ({
  allowanceFeeDetails,
  depositFeeDetails,
  isWalletConnected,
  network,
}: ITxFeesProps) => {
  const { classes } = useTxFeesStyles();

  return (
    <div className={classes.root}>
      <FullTxFeeAttribute
        allowanceFeeDetails={allowanceFeeDetails}
        depositFeeDetails={depositFeeDetails}
        isWalletConnected={isWalletConnected}
        network={network}
      />
      {isWalletConnected && (
        <>
          <PartialTxFeeAttribute
            feeDetails={allowanceFeeDetails}
            label={t('account.payment-flow.steps.approval.title')}
            network={network}
          />
          <PartialTxFeeAttribute
            feeDetails={depositFeeDetails}
            label={t('account.payment-flow.steps.deposit.title')}
            network={network}
          />
        </>
      )}
    </div>
  );
};
