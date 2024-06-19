import { Button } from '@mui/material';
import { Gear } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { ConfigureWhitelistForm } from 'domains/projects/screens/Project/components/ConfigureWhitelistForm';
import { useProjectSidebar } from 'domains/projects/screens/Project/components/ProjectSidebar';

import { useConfigureButtonStyles } from './useConfigureButtonStyles';

export interface ConfigureButtonProps {
  isDisabled: boolean;
}

export const ConfigureButton = ({ isDisabled }: ConfigureButtonProps) => {
  const { handleClose, handleOpen, isOpened } = useProjectSidebar();

  const { classes } = useConfigureButtonStyles();

  return (
    <>
      <Button
        disabled={isDisabled}
        onClick={handleOpen}
        size="small"
        startIcon={<Gear className={classes.icon} />}
        variant="outlined"
        className={classes.button}
      >
        {t('project.whitelist.configure-button')}
      </Button>
      <ConfigureWhitelistForm isOpened={isOpened} onClose={handleClose} />
    </>
  );
};
