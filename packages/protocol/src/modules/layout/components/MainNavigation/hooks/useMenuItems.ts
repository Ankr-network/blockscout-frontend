import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useJwtManager } from 'domains/jwtToken/hooks/useJwtManager';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { guardDialogSlice } from 'modules/guardDialog';

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
  const dispatch = useDispatch();

  const {
    isOpened: isUpgradePlanDialogOpened,
    onClose: handleUpgradePlanDialogClose,
    onOpen: onOpenUpgradePlanDialog,
  } = useUpgradePlanDialog();

  const onOpenAccessDeniedDialog = useCallback(() => {
    dispatch(guardDialogSlice.actions.showDialog())
  }, [dispatch]);

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
        onOpenAccessDeniedDialog,
      }),
    [
      chainsRoutes,
      hasProjects,
      isEnterpriseClient,
      isLoggedIn,
      isMobileSideBar,
      onAnalyticsClick,
      onOpenUpgradePlanDialog,
      onOpenAccessDeniedDialog,
    ],
  );

  const bottomMenuItems = useMemo(
    () => getBottomMenuItems({
      isLoggedIn,
      isEnterpriseClient,
      onDocsClick,
      onOpenAccessDeniedDialog,
    }),
    [isLoggedIn, isEnterpriseClient, onDocsClick, onOpenAccessDeniedDialog],
  );

  return {
    bottomMenuItems,
    handleUpgradePlanDialogClose,
    isLoggedIn,
    isUpgradePlanDialogOpened,
    topMenuItems,
  };
};
