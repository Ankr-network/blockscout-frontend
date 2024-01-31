import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

export interface CancelButtonProps {
  isDisabled?: boolean;
  onClick?: () => void;
}

export const CancelButton = ({ isDisabled, onClick }: CancelButtonProps) => {
  return (
    <Button
      disabled={isDisabled}
      fullWidth
      onClick={onClick}
      size="large"
      variant="outlined"
    >
      {t('teams.decline-team-invitation-dialog.cancel-button')}
    </Button>
  );
};
