import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { t } from 'modules/i18n/utils/intl';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { useStyles } from './useStyles';
import { PlanRoutesConfig } from 'domains/plan/Routes';

export const ProBlock = () => {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      to={PlanRoutesConfig.plan.generatePath()}
      component={Link}
      endIcon={<ArrowRightIcon className={classes.icon} />}
    >
      <div className={classes.left}>
        <Typography variant="body2" color="inherit" className={classes.top}>
          {t('mobile-details.pro-block.unlock')}
        </Typography>
        <Typography variant="h3" color="inherit" className={classes.bottom}>
          {t('mobile-details.pro-block.premium')}
        </Typography>
      </div>
    </Button>
  );
};
