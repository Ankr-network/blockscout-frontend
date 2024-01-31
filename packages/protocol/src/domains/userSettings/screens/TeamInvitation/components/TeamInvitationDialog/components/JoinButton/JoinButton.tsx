import { LoadingButton } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

export interface JoinButtonProps {
  className?: string;
  isJoining: boolean;
  onClick: () => void;
}

export const JoinButton = ({
  className,
  isJoining,
  onClick,
}: JoinButtonProps) => {
  return (
    <LoadingButton
      className={className}
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
