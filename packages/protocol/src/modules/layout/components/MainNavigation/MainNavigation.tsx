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
  isMobileSiderBar: boolean;
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
  isMobileSiderBar,
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
  const hasProjects = isMobileSiderBar
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
      }),
    [
      chainsRoutes,
      hasProjects,
      isEnterpriseClient,
      isLoggedIn,
      onAAPIClick,
      onOpen,
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
          {!isMobileSiderBar && <Navigation items={dashboardItem} />}
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

      <UpgradePlanDialog
        onClose={onClose}
        open={isOpened}
        type={UpgradePlanDialogType.Enterprise}
      />
      {isLoggedIn && isMobileSiderBar && (
        <div className={classes.logout}>
          <Navigation items={logoutItems} isMobileSiderBar={isMobileSiderBar} />
        </div>
      )}
    </div>
  );
};
