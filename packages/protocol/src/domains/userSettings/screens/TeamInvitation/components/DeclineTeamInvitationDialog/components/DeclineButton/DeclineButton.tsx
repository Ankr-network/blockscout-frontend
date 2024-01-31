import { LoadingButton } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

export interface DeclineButtonProps {
  className?: string;
  isDeclining?: boolean;
  onClick?: () => void;
}

export const DeclineButton = ({
  className,
  isDeclining,
  onClick,
}: DeclineButtonProps) => {
  return (
    <LoadingButton
      className={className}
      color="error"
      fullWidth
      loading={isDeclining}
      onClick={onClick}
      size="large"
      variant="contained"
    >
      {t('teams.decline-team-invitation-dialog.decline-button')}
    </LoadingButton>
  );
};
