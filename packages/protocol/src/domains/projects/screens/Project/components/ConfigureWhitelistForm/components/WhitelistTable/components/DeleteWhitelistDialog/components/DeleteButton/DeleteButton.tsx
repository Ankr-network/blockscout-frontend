import { LoadingButton } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

export interface DeleteButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export const DeleteButton = ({ isLoading, onClick }: DeleteButtonProps) => {
  return (
    <LoadingButton
      color="error"
      fullWidth
      loading={isLoading}
      onClick={onClick}
      size="large"
    >
      {t('project.configure-whitelist-form.delete-dialog.delete-button')}
    </LoadingButton>
  );
};
