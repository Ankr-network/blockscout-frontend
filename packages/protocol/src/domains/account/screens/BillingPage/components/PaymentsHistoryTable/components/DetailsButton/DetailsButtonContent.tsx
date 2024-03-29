import { SuccessCryptoPaymentDialog } from 'modules/billing/components/SuccessCryptoPaymentDialog';
import {
  IUseDetailsButtonProps,
  useSuccessCryptoPaymentProps,
} from 'domains/account/screens/BillingPage/hooks/useSuccessCryptoPaymentProps';

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
  const { isLoading, successCryptoPaymentDialogProps } =
    useSuccessCryptoPaymentProps({
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
