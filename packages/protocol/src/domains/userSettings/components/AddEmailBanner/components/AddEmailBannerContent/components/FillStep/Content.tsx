import { Typography } from '@material-ui/core';

import { t } from '@ankr.com/common';
import { ReactComponent as BalanceIcon } from 'uiKit/Icons/balance.svg';
import { ReactComponent as ChartIcon } from 'uiKit/Icons/chart.svg';
import { ReactComponent as PremiumIcon } from 'uiKit/Icons/premium.svg';
import { ReactComponent as SettingsIcon } from 'uiKit/Icons/settings.svg';
import { useFillStepStyles } from './useFillStepStyles';
import { IFeature } from './types';

const features: IFeature[] = [
  {
    Icon: ChartIcon,
    key: 'user-settings.email-banner.add-step.detailed-reports',
  },
  {
    Icon: BalanceIcon,
    key: 'user-settings.email-banner.add-step.balance-status',
  },
  {
    Icon: SettingsIcon,
    key: 'user-settings.email-banner.add-step.product-updates',
  },
  {
    Icon: PremiumIcon,
    key: 'user-settings.email-banner.add-step.exclusive-offers',
  },
];

export const Content = () => {
  const classes = useFillStepStyles();

  return (
    <div className={classes.featureContainer}>
      {features.map(({ Icon, key }) => (
        <div key={key} className={classes.feature}>
          <Icon className={classes.featureIcon} />
          <Typography className={classes.featureText}>{t(key)}</Typography>
        </div>
      ))}
    </div>
  );
};
