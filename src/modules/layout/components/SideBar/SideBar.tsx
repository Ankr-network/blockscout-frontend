import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { AnkrLogoIcon } from 'modules/common/components/Icons/AnkrLogoIcon';
import { t } from 'modules/i18n/utils/intl';
import { MainNavigation } from '../MainNavigation';
import { ExtraNavigation } from '../ExtraNavigation';
import { StakingInfo } from '../StakingInfo';

import { useStyles } from './SideBarStyles';

export const SideBar = () => {
  const classes = useStyles();

  return (
    <aside className={classes.root}>
      <Link className={classes.top} to="/">
        <AnkrLogoIcon className={classes.logo} />
        <Divider orientation="vertical" flexItem className={classes.divider} />
        <Typography variant="body2" color="textSecondary">
          {t('title')}
        </Typography>
      </Link>
      <div className={classes.bottom}>
        <MainNavigation />
        <div>
          <StakingInfo />
          <ExtraNavigation />
        </div>
      </div>
    </aside>
  );
};
