import { CheckMarkImage } from 'modules/common/components/CheckMarkImage';
import { Dialog, IDialogProps } from 'uiKit/Dialog';

import { AddressDetails } from './components/AddressDetails';
import { Header } from './components/Header';
import { IUseSuccessCryptoPaymentDialogProps } from './types';
import { TxDetails } from './components/TxDetails';
import { useSuccessCryptoPaymentDialogStyles } from './useSuccessCryptoPaymentDialogStyles';

export interface ISuccessCryptoPaymentDialigProps
  extends IDialogProps,
    IUseSuccessCryptoPaymentDialogProps {}

export const SuccessCryptoPaymentDialog = ({
  amount,
  amountUSD,
  approval,
  currency,
  depositFee,
  depositFeeUSD,
  depositTxURL,
  fromAddress,
  network,
  paymentType,
  toAddress,
  txDate,
  ...dialogProps
}: ISuccessCryptoPaymentDialigProps) => {
  const { classes } = useSuccessCryptoPaymentDialogStyles();

  return (
    <Dialog {...dialogProps} classes={classes} title={<CheckMarkImage />}>
      <Header className={classes.header} txDate={txDate} />
      <AddressDetails
        className={classes.addressDetails}
        from={fromAddress}
        to={toAddress}
      />
      <TxDetails
        amount={amount}
        amountUSD={amountUSD}
        approval={approval}
        currency={currency}
        depositFee={depositFee}
        depositFeeUSD={depositFeeUSD}
        depositTxURL={depositTxURL}
        network={network}
        paymentType={paymentType}
      />
    </Dialog>
  );
};
