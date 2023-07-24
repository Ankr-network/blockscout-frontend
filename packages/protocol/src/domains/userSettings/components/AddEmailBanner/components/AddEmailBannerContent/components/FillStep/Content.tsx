import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Chart, CoinStack, Gear, Premium } from '@ankr.com/ui';

import { useFillStepStyles } from './useFillStepStyles';
import { IFeature } from './types';

const features: IFeature[] = [
  {
    icon: <Chart />,
    key: 'user-settings.email-banner.add-step.detailed-reports',
  },
  {
    icon: <CoinStack />,
    key: 'user-settings.email-banner.add-step.balance-status',
  },
  {
    icon: <Gear />,
    key: 'user-settings.email-banner.add-step.product-updates',
  },
  {
    icon: <Premium />,
    key: 'user-settings.email-banner.add-step.exclusive-offers',
  },
];

export const Content = () => {
  const { classes } = useFillStepStyles();

  return (
    <div className={classes.featureContainer}>
      {features.map(({ icon, key }) => (
        <div key={key} className={classes.feature}>
          <div className={classes.featureIcon}>{icon}</div>
          <Typography className={classes.featureText}>{t(key)}</Typography>
        </div>
      ))}
    </div>
  );
};
