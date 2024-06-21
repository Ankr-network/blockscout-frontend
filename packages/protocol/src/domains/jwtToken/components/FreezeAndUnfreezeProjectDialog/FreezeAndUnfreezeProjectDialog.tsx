import { MouseEvent } from 'react';
import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';

import { Dialog } from 'uiKit/Dialog';
import { useFreezeAndUnfreezeProject } from 'domains/jwtToken/hooks/useFreezeAndUnfreezeProject';

import { useFreezeAndUnfreezeProjectDialogStyles } from './useFreezeAndUnfreezeProjectDialogStyles';

interface IFreezeAndUnfreezeProjectDialogProps {
  open: boolean;
  isFreeze: boolean;
  userEndpointToken: string;
  projectName: string;
  onClose: (event?: MouseEvent<HTMLButtonElement>) => void;
}

export const FreezeAndUnfreezeProjectDialog = ({
  isFreeze,
  onClose,
  open,
  projectName,
  userEndpointToken,
}: IFreezeAndUnfreezeProjectDialogProps) => {
  const { classes } = useFreezeAndUnfreezeProjectDialogStyles();

  const {
    descriptionText,
    handeUpdateStatus,
    isLoading,
    submitText,
    titleText,
  } = useFreezeAndUnfreezeProject({
    isFreeze,
    userEndpointToken,
    projectName,
    onSuccess: onClose,
  });

  return (
    <Dialog
      fullWidth
      maxPxWidth={600}
      title={titleText}
      open={open}
      onClose={onClose}
    >
      <div>
        <Typography
          variant="body2"
          component="p"
          className={classes.description}
        >
          {descriptionText}
        </Typography>

        <LoadingButton
          fullWidth
          size="large"
          color="error"
          className={classes.submit}
          loading={isLoading}
          onClick={handeUpdateStatus}
        >
          {submitText}
        </LoadingButton>

        <Button fullWidth size="large" variant="outlined" onClick={onClose}>
          {t('projects.freeze-dialog.cancel')}
        </Button>
      </div>
    </Dialog>
  );
};
