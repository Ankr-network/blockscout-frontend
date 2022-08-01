import { Button, Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import { t, tHTML } from 'common';
import { ReactComponent as BalanceIcon } from 'uiKit/Icons/balance.svg';
import { ReactComponent as ChartIcon } from 'uiKit/Icons/chart.svg';
import { ReactComponent as PremiumIcon } from 'uiKit/Icons/premium.svg';
import { ReactComponent as SettingsIcon } from 'uiKit/Icons/settings.svg';
import { useStyles } from './FillStepStyles';
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

interface IFillStepProps {
  handleDoNotShowAgain?: () => void;
  children: ReactNode;
}

export const FillStep = ({
  handleDoNotShowAgain,
  children,
}: IFillStepProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.description}>
        {tHTML('user-settings.email-banner.add-step.description')}
      </Typography>

      <div className={classes.featureContainer}>
        {features.map(({ Icon, key }) => (
          <div key={key} className={classes.feature}>
            <Icon className={classes.featureIcon} />

            <Typography className={classes.featureText}>{t(key)}</Typography>
          </div>
        ))}
      </div>

      {children}

      {handleDoNotShowAgain && (
        <Button
          className={classes.notShowAgain}
          color="primary"
          variant="text"
          onClick={handleDoNotShowAgain}
        >
          {t('user-settings.email-banner.add-step.not-show-again')}
        </Button>
      )}
    </div>
  );
};
