import React from 'react';

import { MainNavigation } from '../MainNavigation';
import { ExtraNavigation } from '../ExtraNavigation';
import { StakingInfo } from '../StakingInfo';
import { Logo } from '../Logo';

import { useStyles } from './SideBarStyles';

export const SideBar = () => {
  const classes = useStyles();

  return (
    <aside className={classes.root}>
      <Logo />
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
