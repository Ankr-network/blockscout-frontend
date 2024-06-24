import { t } from '@ankr.com/common';
import { InlineAlert } from '@ankr.com/ui';

import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { ECurrency, EPaymentType } from 'modules/payments/types';
import { selectHasActiveDeal } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

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
  currentAmount?: number;
  reqs?: number;
}

export const USDPaymentSummaryDialog = ({
  amount,
  currency,
  currentAmount,
  isProceeding,
  onCancelButtonClick,
  onProceedButtonClick,
  paymentType,
  reqs,
  totalAmount,
  totalCurrency,
  ...dialogProps
}: IUSDPaymentSummaryDialogProps) => {
  const { classes } = useUSDPaymentSummaryDialogStyles();

  const hasActiveDeal = useAppSelector(selectHasActiveDeal);

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
          currentAmount={currentAmount}
          reqs={reqs}
        />
        <TotalPaymentInfo
          amount={totalAmount}
          currency={totalCurrency}
          totalAmount={totalAmount}
        />
        {paymentType === EPaymentType.Deal && hasActiveDeal && (
          <InlineAlert severity="info" className={classes.paymentInlineAlert}>
            {t('account.payment-types.deal.info-alert')}
          </InlineAlert>
        )}
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
