import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';

import { Dialog } from 'uiKit/Dialog';

import iconCheck from './assets/check.png';
import { useCreateTeamSuccessDialogStyles } from './useCreateTeamSuccessDialogStyles';

interface CreateTeamSuccessDialogProps {
  isOpened?: boolean;
  onClose: () => void;
  onContinueFlow: () => void;
}

export const CreateTeamSuccessDialog = ({
  isOpened = false,
  onClose,
  onContinueFlow,
}: CreateTeamSuccessDialogProps) => {
  const { classes } = useCreateTeamSuccessDialogStyles();

  return (
    <Dialog
      closeButtonClassName={classes.createTeamSuccessDialogCloseButton}
      onClose={onClose}
      open={isOpened}
      paperClassName={classes.createTeamSuccessDialogRoot}
      title={
        <img alt="success" className={classes.iconSuccess} src={iconCheck} />
      }
      titleClassName={classes.createTeamSuccessDialogTitle}
    >
      <div className={classes.createTeamSuccessDialogInner}>
        <Typography variant="h5">
          {t('teams.create-team-success-dialog.title')}
        </Typography>
        <Typography component="div" variant="body2" color="textSecondary">
          {t('teams.create-team-success-dialog.description')}
        </Typography>

        <div className={classes.createTeamSuccessDialogButtons}>
          <Button fullWidth onClick={onContinueFlow} size="large">
            {t('teams.create-team-success-dialog.button-teammates')}
          </Button>

          <Button fullWidth onClick={onClose} size="large" variant="outlined">
            {t('teams.create-team-success-dialog.button-skip')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
