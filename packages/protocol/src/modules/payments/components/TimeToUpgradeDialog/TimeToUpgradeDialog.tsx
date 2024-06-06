import { Button, Typography } from '@mui/material';
import { Check } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useCallback, useState } from 'react';

import {
  ContentType,
  UpgradePlanDialog,
  UpgradePlanDialogType,
} from 'modules/common/components/UpgradePlanDialog';
import { Dialog, IDialogProps } from 'uiKit/Dialog';
import image from 'modules/common/assets/performance-upgrade.png';

import { useTimeToUpgradeDialogStyles } from './useTimeToUpgradeDialogStyles';

export const TimeToUpgradeDialog = ({ onClose, open }: IDialogProps) => {
  const { classes } = useTimeToUpgradeDialogStyles();

  const [isContactSalesPopup, setIsContactSalesPopup] = useState(false);

  const enterpriseUpgradeHandler = useCallback(() => {
    if (onClose) {
      onClose();
    }

    setIsContactSalesPopup(true);
  }, [onClose]);

  const onCloseContactSalesPopup = useCallback(
    () => setIsContactSalesPopup(false),
    [],
  );

  if (isContactSalesPopup) {
    return (
      <UpgradePlanDialog
        onClose={onCloseContactSalesPopup}
        open={isContactSalesPopup}
        type={UpgradePlanDialogType.Enterprise}
        defaultState={ContentType.CONTACT_SALES_FORM}
      />
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      paperClassName={classes.upgradeDialogPaper}
      closeButtonClassName={classes.closeButton}
    >
      <div className={classes.bg} />
      <div className={classes.content}>
        <img alt="performance upgrade" src={image} className={classes.image} />

        <Typography variant="h6" className={classes.title}>
          {t('enterprise.time-to-upgrade-dialog.title')}
        </Typography>

        <Typography variant="body2" className={classes.description}>
          {t('enterprise.time-to-upgrade-dialog.description')}
        </Typography>

        <Typography variant="body3" className={classes.listItem}>
          <Check size="s" color="success" className={classes.checkIcon} />
          {t('enterprise.time-to-upgrade-dialog.list.item-1')}
        </Typography>
        <Typography variant="body3" className={classes.listItem}>
          <Check size="s" color="success" className={classes.checkIcon} />
          {t('enterprise.time-to-upgrade-dialog.list.item-2')}
        </Typography>
        <Typography variant="body3" className={classes.listItem}>
          <Check size="s" color="success" className={classes.checkIcon} />
          {t('enterprise.time-to-upgrade-dialog.list.item-3')}
        </Typography>
        <Typography variant="body3" className={classes.listItem}>
          <Check size="s" color="success" className={classes.checkIcon} />
          {t('enterprise.time-to-upgrade-dialog.list.item-4')}
        </Typography>
        <Typography variant="body3" className={classes.listItem}>
          <Check size="s" color="success" className={classes.checkIcon} />
          {t('enterprise.time-to-upgrade-dialog.list.item-5')}
        </Typography>

        <Button
          fullWidth
          className={classes.timeToUpgradeBtn}
          onClick={enterpriseUpgradeHandler}
        >
          {t('enterprise.time-to-upgrade-dialog.button-contact')}
        </Button>
        <Button
          fullWidth
          className={classes.timeToUpgradeBtn}
          onClick={onClose}
          variant="outlined"
        >
          {t('enterprise.time-to-upgrade-dialog.button-cancel')}
        </Button>
      </div>
    </Dialog>
  );
};
