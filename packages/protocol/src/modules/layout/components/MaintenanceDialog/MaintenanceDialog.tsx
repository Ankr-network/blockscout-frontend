import { Typography } from '@mui/material';

import { Dialog } from 'uiKit/Dialog';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import image from './assets/ring.png';
import { useMaintenanceDialogStyles } from './useMaintenanceDialogStyles';
import { maintenanceDialogTranslation } from './translation';

interface IMaintenanceDialogProps {
  isOpened: boolean;
  onClose: () => void;
}

export const MaintenanceDialog = ({
  isOpened,
  onClose,
}: IMaintenanceDialogProps) => {
  const { classes } = useMaintenanceDialogStyles();

  const { keys, t, tHTML } = useTranslation(maintenanceDialogTranslation);

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      closeButtonClassName={classes.closeButton}
      paperClassName={classes.root}
      title={
        <div className={classes.imageWrapper}>
          <img alt="Maintenance" className={classes.image} src={image} />
        </div>
      }
    >
      <div className={classes.content}>
        <Typography variant="h6" className={classes.title}>
          {t(keys.title)}
        </Typography>

        <Typography variant="body2" component="p">
          {tHTML(keys.description)}
        </Typography>
      </div>
    </Dialog>
  );
};
