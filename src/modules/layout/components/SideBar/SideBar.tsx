import React from 'react';
import classNames from 'classnames';

import { MainNavigation } from '../MainNavigation';
import { ExtraNavigation } from '../ExtraNavigation';
import { StakingInfo } from '../StakingInfo';
import { Logo } from '../Logo';
import { useStyles } from './SideBarStyles';

interface SidebarProps {
  className?: string;
}

export const SideBar = ({ className = '' }: SidebarProps) => {
  const classes = useStyles();

  return (
    <aside className={classNames(classes.root, className)}>
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
