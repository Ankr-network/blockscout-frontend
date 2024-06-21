import { t } from '@ankr.com/common';

import { Dialog, IDialogProps } from 'uiKit/Dialog';

import { ButtonsGroup, IButtonsGroupProps } from './components/ButtonsGroup';
import { ICryptoPaymentSummaryDialogCommonProps } from './types';
import { TxDetails } from './components/TxDetails';
import { useCryptoPaymentSummaryDialogStyles } from './useCryptoPaymentSummaryDialogStyles';

export interface ICryptoPaymentSummaryDialogProps
  extends ICryptoPaymentSummaryDialogCommonProps,
    IButtonsGroupProps,
    IDialogProps {}

export const CryptoPaymentSummaryDialog = ({
  allowanceFeeDetails,
  amount,
  connectedAddress,
  currency,
  depositFeeDetails,
  handleNetworkChange,
  hasEnoughTokenBalance,
  isAccountChangedOnDepositStep,
  isConfirming,
  isLoading,
  isWalletAccountConnecting,
  network,
  networks,
  onAnotherAddressButtonClick,
  onCancelButtonClick,
  onConfirmButtonClick,
  onConnectButtonClick,
  oneTimeAmountProps,
  totalAmount,
  walletIcon,
  ...dialogProps
}: ICryptoPaymentSummaryDialogProps) => {
  const { classes } = useCryptoPaymentSummaryDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      classes={classes}
      title={t('account.payment-summary-dialog.title')}
    >
      <TxDetails
        allowanceFeeDetails={allowanceFeeDetails}
        amount={amount}
        className={classes.txDetails}
        currency={currency}
        depositFeeDetails={depositFeeDetails}
        hasEnoughTokenBalance={hasEnoughTokenBalance}
        isLoading={isLoading}
        network={network}
        networks={networks}
        onNetworkChange={handleNetworkChange}
        oneTimeAmountProps={oneTimeAmountProps}
        totalAmount={totalAmount}
      />
      <ButtonsGroup
        connectedAddress={connectedAddress}
        isAccountChangedOnDepositStep={isAccountChangedOnDepositStep}
        isConfirming={isConfirming}
        isWalletAccountConnecting={isWalletAccountConnecting}
        onAnotherAddressButtonClick={onAnotherAddressButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onConfirmButtonClick={onConfirmButtonClick}
        onConnectButtonClick={onConnectButtonClick}
        walletIcon={walletIcon}
      />
    </Dialog>
  );
};
