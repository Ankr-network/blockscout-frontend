import {
  Code,
  Coins,
  Dashboard,
  Globe,
  NavBarEndpoints,
  Question,
} from '@ankr.com/ui';
import { Button, Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { SALES_TEAM_CONTACT } from 'modules/common/constants/const';

import { plansTranslation } from '../../plansTranslation';
import { useEnterprisePlanStyles } from './useEnterprisePlanStyles';

export const EnterprisePlan = () => {
  const { classes, cx } = useEnterprisePlanStyles();

  const { keys, t } = useTranslation(plansTranslation);

  const features1 = [
    {
      title: t(keys.enterprise.info1),
      icon: Coins,
    },
    {
      title: t(keys.enterprise.info2),
      icon: Dashboard,
    },
    {
      title: t(keys.enterprise.info3),
      icon: NavBarEndpoints,
    },
  ];

  const features2 = [
    {
      title: t(keys.enterprise.info4),
      icon: Globe,
    },
    {
      title: t(keys.enterprise.info5),
      icon: Question,
    },
    {
      title: t(keys.enterprise.info6),
      icon: Code,
    },
  ];

  return (
    <div className={classes.root}>
      <Typography className={classes.label} component="p">
        {t(keys.enterprise.label)}
      </Typography>
      <div className={classes.content}>
        <div className={classes.column}>
          <Typography className={classes.title} component="p">
            {t(keys.enterprise.title)}
          </Typography>
          <Typography
            className={cx(classes.title, classes.subtitle)}
            component="p"
          >
            {t(keys.enterprise.subtitle)}
          </Typography>
        </div>
        <div className={cx(classes.column, classes.list)}>
          {features1.map(x => (
            <div className={classes.item} key={x.title}>
              <x.icon className={classes.icon} />
              {x.title}
            </div>
          ))}
        </div>
        <div className={cx(classes.column, classes.list)}>
          {features2.map(x => (
            <div className={classes.item} key={x.title}>
              <x.icon className={classes.icon} />
              {x.title}
            </div>
          ))}
        </div>
        <div className={cx(classes.column, classes.reverse)}>
          <Button
            target="_blank"
            href={SALES_TEAM_CONTACT}
            className={classes.button}
          >
            {t(keys.enterprise.button)}
          </Button>
        </div>
      </div>
    </div>
  );
};
