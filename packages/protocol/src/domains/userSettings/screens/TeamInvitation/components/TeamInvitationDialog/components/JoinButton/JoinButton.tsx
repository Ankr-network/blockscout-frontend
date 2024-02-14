import { LoadingButton } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

export interface JoinButtonProps {
  isJoining: boolean;
  onClick: () => void;
}

export const JoinButton = ({ isJoining, onClick }: JoinButtonProps) => {
  return (
    <LoadingButton
      fullWidth
      loading={isJoining}
      onClick={onClick}
      size="large"
      variant="contained"
    >
      {t('teams.team-invitation-dialog.join-button')}
    </LoadingButton>
  );
};
