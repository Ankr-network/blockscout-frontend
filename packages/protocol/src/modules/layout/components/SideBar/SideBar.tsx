import React from 'react';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

import { MainNavigation } from '../MainNavigation';
import { Logo } from '../Logo';
import { SIDEBAR_HEIGHT, useStyles } from './SideBarStyles';
import { ExtraNavigation } from '../ExtraNavigation';

interface SidebarProps {
  className?: string;
  isWalletConnected: boolean;
  hasCredentials: boolean;
}

export const SideBar = ({
  className = '',
  isWalletConnected,
  hasCredentials,
}: SidebarProps) => {
  const classes = useStyles();

  return (
    <aside className={classNames(classes.root, className)}>
      <Scrollbars autoHeightMin={SIDEBAR_HEIGHT}>
        <div className={classes.container}>
          <Logo />
          <div className={classes.bottom}>
            <MainNavigation
              isWalletConnected={isWalletConnected}
              hasCredentials={hasCredentials}
            />
            <div>
              <ExtraNavigation />
            </div>
          </div>
        </div>
      </Scrollbars>
    </aside>
  );
};
