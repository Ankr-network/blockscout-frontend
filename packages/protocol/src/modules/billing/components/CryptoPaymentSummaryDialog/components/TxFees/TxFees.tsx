import {
  FullTxFeeAttribute,
  IFullTxFeeAttributeProps,
} from '../FullTxFeeAttribute';
import { PartialTxFeeAttribute } from '../PartialTxFeeAttribute';
import { useTxFeesStyles } from './useTxFeesStyles';

export interface ITxFeesProps extends IFullTxFeeAttributeProps {}

export const TxFees = ({
  approvalFeeDetails,
  depositFeeDetails,
  network,
}: ITxFeesProps) => {
  const { classes } = useTxFeesStyles();

  return (
    <div className={classes.root}>
      <FullTxFeeAttribute
        approvalFeeDetails={approvalFeeDetails}
        depositFeeDetails={depositFeeDetails}
        network={network}
      />
      <PartialTxFeeAttribute
        feeDetails={approvalFeeDetails}
        network={network}
      />
      <PartialTxFeeAttribute feeDetails={depositFeeDetails} network={network} />
    </div>
  );
};
