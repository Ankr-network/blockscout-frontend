import { t } from '@ankr.com/common';
import { Divider, Typography } from '@mui/material';
import { Navigation } from 'modules/common/components/Navigation';
import { useMemo } from 'react';
import {
  getEndpointsList,
  getMenuList,
  getSettingList,
  getToolsList,
} from './utils/navigationUtils';
import { useMainNavigationStyles } from './useMainNavigationStyles';

interface IMainNavigationProps {
  chainsRoutes: string[];
  hasPremium: boolean;
  loading: boolean;
  onDocsClick: () => void;
  onSettingsClick: () => void;
}

export const MainNavigation = ({
  loading,
  hasPremium,
  chainsRoutes,
  onDocsClick,
  onSettingsClick,
}: IMainNavigationProps) => {
  const endpointsItems = useMemo(
    () => getEndpointsList(chainsRoutes),
    [chainsRoutes],
  );

  const toolsItems = useMemo(() => getToolsList(), []);

  const menuItems = useMemo(
    () => getMenuList(hasPremium, onDocsClick),
    [hasPremium, onDocsClick],
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
      <Typography className={classes.tip}>
        {t('main-navigation.tools')}
      </Typography>
      <Navigation loading={loading} items={toolsItems} />
      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
      <Navigation loading={loading} items={menuItems} />
      <div className={classes.setting}>
        <Navigation loading={loading} items={settingItems} />
      </div>
    </div>
  );
};
