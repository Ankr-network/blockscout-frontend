import { Button } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useProjectSidebarFooterStyles } from './useProjectSidebarFooterStyles';

export interface ProjectSidebarFooterProps {
  isConfirmationDisabled?: boolean;
  isConfirming?: boolean;
  onCancelButtonClick?: () => void;
  onConfirmButtonClick?: () => void;
}

export const ProjectSidebarFooter = ({
  isConfirmationDisabled,
  isConfirming,
  onCancelButtonClick,
  onConfirmButtonClick,
}: ProjectSidebarFooterProps) => {
  const { classes } = useProjectSidebarFooterStyles();

  return (
    <div className={classes.root}>
      <LoadingButton
        disabled={isConfirmationDisabled}
        fullWidth
        loading={isConfirming}
        onClick={onConfirmButtonClick}
        variant="contained"
      >
        {t('project.sidebar.confirm-button')}
      </LoadingButton>
      <Button onClick={onCancelButtonClick} fullWidth variant="outlined">
        {t('project.sidebar.cancel-button')}
      </Button>
    </div>
  );
};
