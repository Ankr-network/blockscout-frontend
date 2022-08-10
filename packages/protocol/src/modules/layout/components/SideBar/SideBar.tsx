import React from 'react';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

import { MainNavigation } from '../MainNavigation';
import { Logo } from '../Logo';
import { SIDEBAR_HEIGHT, useStyles } from './SideBarStyles';
import { ExtraNavigation } from '../ExtraNavigation';

interface SidebarProps {
  className?: string;
  loading: boolean;
  isWalletConnected: boolean;
  hasCredentials: boolean;
  chainsRoutes: string[];
}

export const SideBar = ({
  className = '',
  loading,
  isWalletConnected,
  hasCredentials,
  chainsRoutes,
}: SidebarProps) => {
  const classes = useStyles();

  return (
    <aside className={classNames(classes.root, className)}>
      <Scrollbars autoHeightMin={SIDEBAR_HEIGHT}>
        <div className={classes.container}>
          <Logo />
          <div className={classes.bottom}>
            <MainNavigation
              loading={loading}
              isWalletConnected={isWalletConnected}
              hasCredentials={hasCredentials}
              chainsRoutes={chainsRoutes}
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
