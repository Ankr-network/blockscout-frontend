import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

export interface SignInButtonProps {
  isDisabled?: boolean;
  onClick: () => void;
}

export const SignInButton = ({ isDisabled, onClick }: SignInButtonProps) => {
  return (
    <Button
      disabled={isDisabled}
      fullWidth
      onClick={onClick}
      size="large"
      variant="outlined"
    >
      {t('teams.team-invitation-dialog.sign-in-button')}
    </Button>
  );
};
