import { t } from '@ankr.com/common';
import { Divider, Typography } from '@mui/material';
import { Navigation } from 'modules/common/components/Navigation';
import { useMemo } from 'react';
import {
  getCommonMenuList,
  getEndpointsList,
  getMenuList,
  getSettingList,
} from './utils/navigationUtils';
import { useMainNavigationStyles } from './useMainNavigationStyles';

interface IMainNavigationProps {
  chainsRoutes: string[];
  isLoggedIn: boolean;
  hasPremium: boolean;
  loading: boolean;
  onAAPIClick: () => void;
  onDashboardClick: () => void;
  onDocsClick: () => void;
  onSettingsClick: () => void;
}

export const MainNavigation = ({
  chainsRoutes,
  isLoggedIn,
  hasPremium,
  loading,
  onAAPIClick,
  onDashboardClick,
  onDocsClick,
  onSettingsClick,
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

  const { classes } = useMainNavigationStyles();

  return (
    <div className={classes.root}>
      {hasPremium && <Navigation loading={loading} items={commonItem} />}
      <Typography className={classes.tip}>
        {t('main-navigation.endpoints')}
      </Typography>
      <Navigation loading={loading} items={endpointsItems} />
      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
      <Navigation loading={loading} items={menuItems} />
      <div className={classes.setting}>
        <Navigation loading={loading} items={settingItems} />
      </div>
    </div>
  );
};
