import { LoadingButton } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

export interface InviteButtonProps {
  className?: string;
  isInviting?: boolean;
  onClick?: () => void;
}

export const InviteButton = ({
  className,
  isInviting,
  onClick,
}: InviteButtonProps) => {
  return (
    <LoadingButton
      className={className}
      fullWidth
      loading={isInviting}
      onClick={onClick}
      size="large"
      variant="contained"
    >
      {t('teams.invite-teammates-dialog.invite-button')}
    </LoadingButton>
  );
};
