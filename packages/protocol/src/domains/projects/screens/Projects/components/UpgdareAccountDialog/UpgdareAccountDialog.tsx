import { Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { Check } from '@ankr.com/ui';

import { Dialog } from 'uiKit/Dialog';

import image from './assets/performance-upgrade.png';
import { useUpgdareAccountDialogStyles } from './useUpgdareAccountDialogStyles';

interface IUpgdareAccountDialogProps {
  isOpened: boolean;
  handleClickSeePlans: () => void;
  handleClose: () => void;
}

export const UpgdareAccountDialog = ({
  isOpened,
  handleClickSeePlans,
  handleClose,
}: IUpgdareAccountDialogProps) => {
  const { classes } = useUpgdareAccountDialogStyles();

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      maxPxWidth={600}
      closeButtonClassName={classes.closeButtonClassName}
      title={
        <div className={classes.imageWrapper}>
          <img alt="Launch" className={classes.image} src={image} />
        </div>
      }
    >
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          <Typography variant="h5" className={classes.title}>
            {t('projects.upgrade-account-dialog.title')}
          </Typography>

          <Typography
            variant="body2"
            component="p"
            className={classes.description}
          >
            {tHTML('projects.upgrade-account-dialog.description')}
          </Typography>

          <Typography className={classes.item}>
            <Check size="xs" />
            {tHTML('projects.upgrade-account-dialog.item-1')}
          </Typography>
          <Typography className={classes.item}>
            <Check size="xs" />
            {t('projects.upgrade-account-dialog.item-2')}
          </Typography>
          <Typography className={classes.item}>
            <Check size="xs" />
            {t('projects.upgrade-account-dialog.item-3')}
          </Typography>
        </div>

        <Button
          fullWidth
          className={classes.confirmButton}
          onClick={handleClickSeePlans}
        >
          {t('projects.upgrade-account-dialog.see-plans')}
        </Button>
        <Button fullWidth variant="outlined" onClick={handleClose}>
          {t('projects.upgrade-account-dialog.cancel')}
        </Button>
      </div>
    </Dialog>
  );
};
