import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

export interface CancelButtonProps {
  onClick: () => void;
}

export const CancelButton = ({ onClick }: CancelButtonProps) => {
  return (
    <Button fullWidth onClick={onClick} size="large" variant="outlined">
      {t('project.configure-whitelist-form.delete-dialog.cancel-button')}
    </Button>
  );
};
