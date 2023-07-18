import { useMemo } from 'react';
import { Divider, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Navigation } from 'modules/common/components/Navigation';
import {
  getCommonMenuList,
  getPremiumEndpointsList,
  getLogoutItem,
  getMenuList,
  getSettingList,
} from './utils/navigationUtils';
import { useMainNavigationStyles } from './useMainNavigationStyles';
import { MainNavigationSkeleton } from './MainNavigationSkeletion';

interface IMainNavigationProps {
  chainsRoutes: string[];
  hasJwtManagerAccess: boolean;
  isLoggedIn: boolean;
  isMobileSiderBar: boolean;
  loading: boolean;
  onAAPIClick: () => void;
  onDashboardClick: () => void;
  onDocsClick: () => void;
  onSettingsClick: () => void;
  onSignoutClick: () => void;
}

export const MainNavigation = ({
  chainsRoutes,
  hasJwtManagerAccess,
  isLoggedIn,
  isMobileSiderBar,
  loading,
  onAAPIClick,
  onDashboardClick,
  onDocsClick,
  onSettingsClick,
  onSignoutClick,
}: IMainNavigationProps) => {
  const endpointsItems = useMemo(
    () =>
      getPremiumEndpointsList({
        chainsRoutes,
        hasJwtManagerAccess,
        onAAPIClick,
      }),
    [chainsRoutes, hasJwtManagerAccess, onAAPIClick],
  );

  const commonItem = useMemo(
    () => getCommonMenuList(onDashboardClick),
    [onDashboardClick],
  );

  const menuItems = useMemo(
    () => getMenuList(isLoggedIn, onDocsClick),
    [isLoggedIn, onDocsClick],
  );

  const settingItems = useMemo(
    () => getSettingList(onSettingsClick),
    [onSettingsClick],
  );

  const logoutItems = useMemo(
    () => getLogoutItem(onSignoutClick),
    [onSignoutClick],
  );

  const { classes } = useMainNavigationStyles(isMobileSiderBar);

  if (loading) {
    return (
      <MainNavigationSkeleton
        isMobileSiderBar={isMobileSiderBar}
        isLoggedIn={isLoggedIn}
      />
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div>
          {isLoggedIn && (
            <Navigation
              items={commonItem}
              isMobileSiderBar={isMobileSiderBar}
            />
          )}
          <Typography className={classes.tip}>
            {t('main-navigation.endpoints')}
          </Typography>
          <Navigation
            items={endpointsItems}
            isMobileSiderBar={isMobileSiderBar}
          />
          <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
          <Navigation items={menuItems} isMobileSiderBar={isMobileSiderBar} />
        </div>
        <div className={classes.setting}>
          <Navigation
            items={settingItems}
            isMobileSiderBar={isMobileSiderBar}
          />
        </div>
      </div>
      {isLoggedIn && isMobileSiderBar && (
        <div className={classes.logout}>
          <Navigation items={logoutItems} isMobileSiderBar={isMobileSiderBar} />
        </div>
      )}
    </div>
  );
};
