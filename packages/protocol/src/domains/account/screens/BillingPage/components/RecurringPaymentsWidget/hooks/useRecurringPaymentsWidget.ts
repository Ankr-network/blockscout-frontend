import { useDialog } from 'modules/common/hooks/useDialog';
import {
  selectAllRecurringPaymentsAmount,
  selectHasRecurringPayments,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export const useRecurringPaymentsWidget = () => {
  const allPaymentsAmount = useAppSelector(selectAllRecurringPaymentsAmount);
  const isSubscribed = useAppSelector(selectHasRecurringPayments);

  const {
    isOpened: isEditDialogOpened,
    onClose: onEditDialogClose,
    onOpen: onEdit,
  } = useDialog();

  return {
    amount: allPaymentsAmount,
    isEditDialogOpened,
    isSubscribed,
    onEdit,
    onEditDialogClose,
  };
};
