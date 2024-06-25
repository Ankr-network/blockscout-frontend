import { t } from '@ankr.com/common';

import { useDialog } from 'modules/common/hooks/useDialog';

interface IUseConfirmCancelDialogProps {
  nextPaymentDate: string;
  recurringAmount?: string;
  customChargingModelName?: string;
}

export const useConfirmCancelDialog = ({
  customChargingModelName,
  nextPaymentDate,
  recurringAmount,
}: IUseConfirmCancelDialogProps) => {
  const { isOpened, onClose, onOpen } = useDialog();

  const dialogTitle = customChargingModelName
    ? t('account.periodic-payments.cancel.custom-title', {
        customChargingModelName,
      })
    : t('account.periodic-payments.cancel.recurring-title');

  const dialogDescription = customChargingModelName
    ? t('account.periodic-payments.cancel.custom-description', {
        customChargingModelName,
        date: nextPaymentDate,
      })
    : t('account.periodic-payments.cancel.recurring-description', {
        date: nextPaymentDate,
        amount: recurringAmount,
      });

  return {
    isOpened,
    onOpen,
    onClose,
    dialogTitle,
    dialogDescription,
  };
};
