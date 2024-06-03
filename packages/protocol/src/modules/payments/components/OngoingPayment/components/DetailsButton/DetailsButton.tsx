import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

export interface IDetailsButtonProps {
  onClick: () => void;
}

export const DetailsButton = ({ onClick }: IDetailsButtonProps) => {
  return (
    <Button onClick={onClick} size="extraSmall" variant="outlined">
      {t('account.payment-table.details')}
    </Button>
  );
};
