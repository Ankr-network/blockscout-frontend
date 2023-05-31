import { t } from '@ankr.com/common';
import { Divider, Typography } from '@mui/material';
import { Navigation } from 'modules/common/components/Navigation';
import { useMemo } from 'react';
import {
  getEndpointsList,
  getMenuList,
  getSettingList,
} from './utils/navigationUtils';
import { useMainNavigationStyles } from './useMainNavigationStyles';

interface IMainNavigationProps {
  chainsRoutes: string[];
  isLoggedIn: boolean;
  loading: boolean;
  onAAPIClick: () => void;
  onDocsClick: () => void;
  onSettingsClick: () => void;
}

export const MainNavigation = ({
  chainsRoutes,
  isLoggedIn,
  loading,
  onAAPIClick,
  onDocsClick,
  onSettingsClick,
}: IMainNavigationProps) => {
  const endpointsItems = useMemo(
    () => getEndpointsList(chainsRoutes, onAAPIClick),
    [chainsRoutes, onAAPIClick],
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
