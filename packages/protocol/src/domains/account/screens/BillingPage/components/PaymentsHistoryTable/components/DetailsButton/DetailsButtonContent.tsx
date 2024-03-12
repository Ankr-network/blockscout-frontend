import { SuccessCryptoPaymentDialog } from 'modules/billing/components/SuccessCryptoPaymentDialog';

import { IUseDetailsButtonProps, useDetailsButton } from './useDetailsButton';

interface IDetailsButtonContentProps
  extends Omit<IUseDetailsButtonProps, 'isOpened'> {
  isOpened: boolean;
  onClose: () => void;
}

export const DetailsButtonContent = ({
  amount,
  token,
  txHash,
  date,
  isOpened,
  onClose,
}: IDetailsButtonContentProps) => {
  const { isLoading, successCryptoPaymentDialogProps } = useDetailsButton({
    amount,
    token,
    txHash,
    date,
    isOpened,
  });

  return (
    <SuccessCryptoPaymentDialog
      {...successCryptoPaymentDialogProps}
      open={isOpened}
      onClose={onClose}
      isLoading={isLoading}
    />
  );
};
