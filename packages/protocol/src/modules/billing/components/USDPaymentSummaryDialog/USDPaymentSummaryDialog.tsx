import { t } from '@ankr.com/common';

import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { ECurrency } from 'modules/billing/types';

import { Buttons, IButtonsProps } from './components/Buttons';
import { IPaymentInfoProps, PaymentInfo } from '../PaymentInfo';
import { SeparatedList } from '../SeparatedList';
import { StripeWordmark } from '../StripeWordMark';
import { TotalPaymentInfo } from '../TotalPaymentInfo';
import { useUSDPaymentSummaryDialogStyles } from './useUSDPaymentSummaryDialogStyles';

export interface IUSDPaymentSummaryDialogProps
  extends IDialogProps,
    IPaymentInfoProps,
    IButtonsProps {
  totalAmount: number;
  totalCurrency: ECurrency;
}

export const USDPaymentSummaryDialog = ({
  amount,
  currency,
  paymentType,
  totalAmount,
  totalCurrency,
  onCancelButtonClick,
  onProceedButtonClick,
  isProceeding,
  ...dialogProps
}: IUSDPaymentSummaryDialogProps) => {
  const { classes } = useUSDPaymentSummaryDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      classes={classes}
      title={t('account.payment-summary-dialog.title')}
      titleClassName={classes.title}
    >
      <SeparatedList className={classes.list}>
        <PaymentInfo
          amount={amount}
          currency={currency}
          paymentType={paymentType}
        />
        <TotalPaymentInfo
          amount={totalAmount}
          currency={totalCurrency}
          totalAmount={totalAmount}
        />
      </SeparatedList>
      <Buttons
        className={classes.buttons}
        onCancelButtonClick={onCancelButtonClick}
        onProceedButtonClick={onProceedButtonClick}
        isProceeding={isProceeding}
      />
      <StripeWordmark />
    </Dialog>
  );
};
