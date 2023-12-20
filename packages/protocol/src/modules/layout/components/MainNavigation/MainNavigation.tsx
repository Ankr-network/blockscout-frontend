import { useMemo } from 'react';
import { Divider, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Navigation } from 'modules/common/components/Navigation';
import {
  UpgradePlanDialog,
  UpgradePlanDialogType,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useJwtManager } from 'domains/jwtToken/hooks/useJwtManager';

import {
  getDashboardMenuList,
  getEndpointsList,
  getLogoutItem,
  getMenuList,
  getSettingList,
} from './utils/navigationUtils';
import { useMainNavigationStyles } from './useMainNavigationStyles';
import { MainNavigationSkeleton } from './MainNavigationSkeletion';

interface IMainNavigationProps {
  chainsRoutes: string[];
  isLoggedIn: boolean;
  isEnterpriseClient: boolean;
  isMobileSideBar: boolean;
  loading: boolean;
  onAAPIClick: () => void;
  onDashboardClick: () => void;
  onDocsClick: () => void;
  onSettingsClick: () => void;
  onSignOutClick: () => void;
}

export const MainNavigation = ({
  chainsRoutes,
  isLoggedIn,
  isEnterpriseClient,
  isMobileSideBar,
  loading,
  onAAPIClick,
  onDashboardClick,
  onDocsClick,
  onSettingsClick,
  onSignOutClick,
}: IMainNavigationProps) => {
  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();
  const { isFreePremium } = useAuth();

  const { hasReadAccess } = useJwtManager();
  const hasProjects = isMobileSideBar
    ? false
    : !loading || !isLoggedIn || isFreePremium || hasReadAccess;

  const endpointsItems = useMemo(
    () =>
      getEndpointsList({
        chainsRoutes,
        hasProjects,
        isEnterpriseClient,
        onAAPIClick,
        onOpenUpgradePlanDialog: onOpen,
        isLoggedIn,
        isMobileSideBar,
      }),
    [
      chainsRoutes,
      hasProjects,
      isEnterpriseClient,
      isLoggedIn,
      onAAPIClick,
      onOpen,
      isMobileSideBar,
    ],
  );

  const dashboardItem = useMemo(
    () => getDashboardMenuList(onDashboardClick),
    [onDashboardClick],
  );

  const menuItems = useMemo(
    () => getMenuList(isLoggedIn, onDocsClick, isEnterpriseClient),
    [isLoggedIn, onDocsClick, isEnterpriseClient],
  );

  const settingItems = useMemo(
    () => getSettingList(onSettingsClick),
    [onSettingsClick],
  );

  const logoutItems = useMemo(
    () => getLogoutItem(onSignOutClick),
    [onSignOutClick],
  );

  const { classes } = useMainNavigationStyles(isMobileSideBar);

  if (loading) {
    return (
      <MainNavigationSkeleton
        isMobileSideBar={isMobileSideBar}
        isLoggedIn={isLoggedIn}
      />
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div>
          {!isMobileSideBar && <Navigation items={dashboardItem} />}
          <Typography className={classes.tip}>
            {t('main-navigation.endpoints')}
          </Typography>
          <Navigation
            items={endpointsItems}
            isMobileSideBar={isMobileSideBar}
          />
          <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
          <Navigation items={menuItems} isMobileSideBar={isMobileSideBar} />
        </div>
        <div className={classes.setting}>
          <Navigation items={settingItems} isMobileSideBar={isMobileSideBar} />
        </div>
      </div>

      <UpgradePlanDialog
        onClose={onClose}
        open={isOpened}
        type={UpgradePlanDialogType.Enterprise}
      />
      {isLoggedIn && isMobileSideBar && (
        <div className={classes.logout}>
          <Navigation items={logoutItems} isMobileSideBar={isMobileSideBar} />
        </div>
      )}
    </div>
  );
};
