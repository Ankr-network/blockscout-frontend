import { Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { DashboardRoutesConfig } from 'domains/dashboard/routes';

import imgLock from './assets/lock.png';
import { useDashBoardPlaceholderStyles } from './useDashBoardPlaceholderStyles';

export const DashboardPlaceholder = () => {
  useSetBreadcrumbs([
    { title: t(DashboardRoutesConfig.dashboard.breadcrumbs) },
  ]);

  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

  const { classes } = useDashBoardPlaceholderStyles();

  return (
    <div className={classes.dashboardPlaceholder}>
      <div className={classes.placeholderRoot}>
        <img className={classes.img} src={imgLock} alt="unlock" />
        <Typography variant="subtitle1" className={classes.placeholderTitle}>
          {tHTML('dashboard.placeholder.title')}
          <span className={classes.textPremium}>
            {t('dashboard.placeholder.premium')}
          </span>
        </Typography>
        <Button size="large" fullWidth className={classes.btn} onClick={onOpen}>
          {t('dashboard.placeholder.button')}
        </Button>
      </div>
      <UpgradePlanDialog onClose={onClose} open={isOpened} />
    </div>
  );
};
