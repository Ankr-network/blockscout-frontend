import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

export interface IDiscardButtonProps {
  onClick: () => void;
}

export const DiscardButton = ({ onClick }: IDiscardButtonProps) => {
  return (
    <Button
      color="error"
      fullWidth
      onClick={onClick}
      size="large"
      variant="outlined"
    >
      {t('account.crypto-payment-deposit-dialog.discard-button')}
    </Button>
  );
};
