import React from 'react';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

import { MainNavigation } from '../MainNavigation';
import { ExtraNavigation } from '../ExtraNavigation';
import { StakingInfo } from '../StakingInfo';
import { Logo } from '../Logo';
import { SIDEBAR_HEIGHT, useStyles } from './SideBarStyles';

interface SidebarProps {
  className?: string;
}

export const SideBar = ({ className = '' }: SidebarProps) => {
  const classes = useStyles();

  return (
    <aside className={classNames(classes.root, className)}>
      <Scrollbars autoHeightMin={SIDEBAR_HEIGHT}>
        <div className={classes.container}>
          <Logo />
          <div className={classes.bottom}>
            <MainNavigation />
            <div>
              <StakingInfo />
              <ExtraNavigation />
            </div>
          </div>
        </div>
      </Scrollbars>
    </aside>
  );
};
