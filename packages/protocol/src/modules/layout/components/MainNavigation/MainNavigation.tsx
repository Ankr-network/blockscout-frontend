import { useMemo } from 'react';
import { Divider, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Navigation } from 'modules/common/components/Navigation';
import {
  getCommonMenuList,
  getEndpointsList,
  getLogoutItem,
  getMenuList,
  getSettingList,
} from './utils/navigationUtils';
import { useMainNavigationStyles } from './useMainNavigationStyles';

interface IMainNavigationProps {
  chainsRoutes: string[];
  isLoggedIn: boolean;
  loading: boolean;
  isMobileSiderBar: boolean;
  onAAPIClick: () => void;
  onDashboardClick: () => void;
  onDocsClick: () => void;
  onSettingsClick: () => void;
  onSignoutClick: () => void;
}

export const MainNavigation = ({
  chainsRoutes,
  isLoggedIn,
  loading,
  isMobileSiderBar,
  onAAPIClick,
  onDashboardClick,
  onDocsClick,
  onSettingsClick,
  onSignoutClick,
}: IMainNavigationProps) => {
  const endpointsItems = useMemo(
    () => getEndpointsList({ chainsRoutes, onAAPIClick }),
    [chainsRoutes, onAAPIClick],
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

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div>
          {isLoggedIn && (
            <Navigation
              loading={loading}
              items={commonItem}
              isMobileSiderBar={isMobileSiderBar}
            />
          )}
          <Typography className={classes.tip}>
            {t('main-navigation.endpoints')}
          </Typography>
          <Navigation
            loading={loading}
            items={endpointsItems}
            isMobileSiderBar={isMobileSiderBar}
          />
          <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
          <Navigation
            loading={loading}
            items={menuItems}
            isMobileSiderBar={isMobileSiderBar}
          />
        </div>
        <div className={classes.setting}>
          <Navigation
            loading={loading}
            items={settingItems}
            isMobileSiderBar={isMobileSiderBar}
          />
        </div>
      </div>
      {isLoggedIn && isMobileSiderBar && (
        <div className={classes.logout}>
          <Navigation
            loading={loading}
            items={logoutItems}
            isMobileSiderBar={isMobileSiderBar}
          />
        </div>
      )}
    </div>
  );
};
