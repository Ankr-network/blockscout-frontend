import { CryptoPaymentSuccessDialog } from 'modules/billing/components/CryptoPaymentSuccessDialog';
import {
  IUseDetailsButtonProps,
  useCryptoPaymentSuccessDialog,
} from 'domains/account/screens/BillingPage/hooks/useCryptoPaymentSuccessDialog';

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
  const { isLoading, cryptoPaymentSuccessDialogProps } =
    useCryptoPaymentSuccessDialog({
      amount,
      token,
      txHash,
      date,
      isOpened,
    });

  return (
    <CryptoPaymentSuccessDialog
      {...cryptoPaymentSuccessDialogProps}
      isLoading={isLoading}
      onClose={onClose}
      open={isOpened}
    />
  );
};
