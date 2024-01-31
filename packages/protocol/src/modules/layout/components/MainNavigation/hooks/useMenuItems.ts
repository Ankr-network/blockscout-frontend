import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useJwtManager } from 'domains/jwtToken/hooks/useJwtManager';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';

import { getBottomMenuItems } from '../utils/getBottomMenuItems';
import { getTopMenuItems } from '../utils/getTopMenuItems';

export interface IUseMenuItemsProps {
  chainsRoutes: string[];
  isEnterpriseClient: boolean;
  isMobileSideBar: boolean;
  loading: boolean;
  onAnalyticsClick: () => void;
  onDocsClick: () => void;
}

export const useMenuItems = ({
  chainsRoutes,
  isEnterpriseClient,
  isMobileSideBar,
  loading,
  onAnalyticsClick,
  onDocsClick,
}: IUseMenuItemsProps) => {
  const { isFreePremium, isLoggedIn } = useAuth();

  const {
    isOpened: isUpgradePlanDialogOpened,
    onClose: handleUpgradePlanDialogClose,
    onOpen: onOpenUpgradePlanDialog,
  } = useUpgradePlanDialog();

  const { hasReadAccess } = useJwtManager();
  const hasProjects =
    !isMobileSideBar &&
    (!loading || !isLoggedIn || isFreePremium || hasReadAccess);

  const topMenuItems = useMemo(
    () =>
      getTopMenuItems({
        chainsRoutes,
        hasProjects,
        isEnterpriseClient,
        isLoggedIn,
        isMobileSideBar,
        onDashboardClick: onAnalyticsClick,
        onOpenUpgradePlanDialog,
      }),
    [
      chainsRoutes,
      hasProjects,
      isEnterpriseClient,
      isLoggedIn,
      isMobileSideBar,
      onAnalyticsClick,
      onOpenUpgradePlanDialog,
    ],
  );

  const bottomMenuItems = useMemo(
    () => getBottomMenuItems(isLoggedIn, onDocsClick, isEnterpriseClient),
    [isLoggedIn, onDocsClick, isEnterpriseClient],
  );

  return {
    bottomMenuItems,
    handleUpgradePlanDialogClose,
    isLoggedIn,
    isUpgradePlanDialogOpened,
    topMenuItems,
  };
};
