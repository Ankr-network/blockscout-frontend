import { useCallback, useMemo } from 'react';

import { ECurrency, EPaymentType, IAmount } from 'modules/payments/types';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useLazyUsdTopUpFetchLinkForRecurrentCardPaymentQuery } from 'domains/account/actions/usdTopUp/fetchLinkForRecurrentCardPayment';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { IUSDPaymentSummaryDialogProps } from '../../USDPaymentSummaryDialog';

export interface IUseRecurringPaymentProps {
  amount?: IAmount;
}

export const useRecurringPayment = ({ amount }: IUseRecurringPaymentProps) => {
  const id = amount?.id;
  const amountValue = amount?.value || 0;

  const { isOpened: open, onClose, onOpen } = useDialog();

  const [fetchLink, { isFetching }] =
    useLazyUsdTopUpFetchLinkForRecurrentCardPaymentQuery();

  const { selectedGroupAddress: groupAddress } = useSelectedUserGroup();

  const onProceedButtonClick = useCallback(async () => {
    if (id) {
      const { data: url } = await fetchLink({ id, groupAddress });

      if (url) {
        window.location.href = url;
      }
    }
  }, [fetchLink, groupAddress, id]);

  const recurringPaymentSummaryDialogProps = useMemo(
    (): IUSDPaymentSummaryDialogProps => ({
      amount: amountValue,
      currency: ECurrency.USD,
      isProceeding: isFetching,
      onCancelButtonClick: onClose,
      onClose,
      onProceedButtonClick,
      open,
      paymentType: EPaymentType.Recurring,
      totalAmount: amountValue,
      totalCurrency: ECurrency.USD,
    }),
    [amountValue, isFetching, onClose, onProceedButtonClick, open],
  );

  const handleRecurrungPaymentSummaryDialogOpen = onOpen;

  return {
    handleRecurrungPaymentSummaryDialogOpen,
    recurringPaymentSummaryDialogProps,
  };
};
