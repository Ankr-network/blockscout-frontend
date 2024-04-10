import { OverlaySpinner } from '@ankr.com/ui';
import { Web3Address } from 'multirpc-sdk';

import { CheckMarkImage } from 'modules/common/components/CheckMarkImage';
import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { Placeholder } from 'modules/common/components/Placeholder';

import { AddressDetails } from './components/AddressDetails';
import { Header } from './components/Header';
import { IUseCryptoPaymentSuccessDialogProps } from './types';
import { TxDetails } from './components/TxDetails';
import { useCryptoPaymentSuccessDialogStyles } from './useCryptoPaymentSuccessDialogStyles';

export interface ICryptoPaymentSuccessDialogProps
  extends IDialogProps,
    Omit<IUseCryptoPaymentSuccessDialogProps, 'txHash'> {
  amountUsd: number;
  depositFee: number;
  depositFeeUSD: number;
  depositTxURL: string;
  fromAddress: Web3Address;
  isLoading?: boolean;
  toAddress: Web3Address;
  txDate?: Date;
}

export const CryptoPaymentSuccessDialog = ({
  amount,
  amountUsd,
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
  isLoading = false,
  onClose,
  ...dialogProps
}: ICryptoPaymentSuccessDialogProps) => {
  const { classes } = useCryptoPaymentSuccessDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      classes={classes}
      onClose={onClose}
      title={!isLoading && <CheckMarkImage />}
    >
      <Placeholder hasPlaceholder={isLoading} placeholder={<OverlaySpinner />}>
        <Header className={classes.header} txDate={txDate} />
        <AddressDetails
          className={classes.addressDetails}
          from={fromAddress}
          to={toAddress}
        />
        <TxDetails
          amount={amount}
          amountUsd={amountUsd}
          approval={approval}
          currency={currency}
          depositFee={depositFee}
          depositFeeUSD={depositFeeUSD}
          depositTxURL={depositTxURL}
          network={network}
          paymentType={paymentType}
        />
      </Placeholder>
    </Dialog>
  );
};
