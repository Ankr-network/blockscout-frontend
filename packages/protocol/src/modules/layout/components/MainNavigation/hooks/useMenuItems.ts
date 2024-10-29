import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { guardDialogSlice } from 'modules/guardDialog';
import { selectIsSelectedUserGroupPersonal } from 'domains/userGroup/store';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCommonNotificationsData } from 'modules/notifications/hooks/useCommonNotificationsData';
import { useJWTManagerPermissions } from 'domains/jwtToken/hooks/useJWTManagerPermissions';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';

import { getSecondMenuItems } from '../utils/getSecondMenuItems';
import { getTopMenuItems } from '../utils/getTopMenuItems';

export interface IUseMenuItemsProps {
  chainsRoutes: string[];
  isEnterpriseClient: boolean;
  isMobileSideBar: boolean;
  loading: boolean;
  onAnalyticsClick: () => void;
}

export const useMenuItems = ({
  chainsRoutes,
  isEnterpriseClient,
  isMobileSideBar,
  loading,
  onAnalyticsClick,
}: IUseMenuItemsProps) => {
  const { isFreePremium, isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  const {
    isOpened: isUpgradePlanDialogOpened,
    onClose: handleUpgradePlanDialogClose,
    onOpen: onOpenUpgradePlanDialog,
  } = useUpgradePlanDialog();

  const onOpenAccessDeniedDialog = useCallback(() => {
    dispatch(guardDialogSlice.actions.showDialog());
  }, [dispatch]);

  const { unseenNotificationsAmount } = useCommonNotificationsData();

  const { hasReadAccess } = useJWTManagerPermissions();
  const hasProjects =
    !isMobileSideBar &&
    (!loading || !isLoggedIn || isFreePremium || hasReadAccess);

  const isPersonalGroup = useAppSelector(selectIsSelectedUserGroupPersonal);

  const topMenuItems = useMemo(
    () =>
      getTopMenuItems({
        chainsRoutes,
        hasProjects,
        isEnterpriseClient,
        isPersonalGroup,
        isLoggedIn,
        isMobileSideBar,
        notificationsAmount: unseenNotificationsAmount,
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
      isPersonalGroup,
      unseenNotificationsAmount,
      onAnalyticsClick,
      onOpenUpgradePlanDialog,
      onOpenAccessDeniedDialog,
    ],
  );

  const secondMenuItems = useMemo(
    () =>
      getSecondMenuItems({
        isLoggedIn,
        isEnterpriseClient,
        onOpenAccessDeniedDialog,
      }),
    [isLoggedIn, isEnterpriseClient, onOpenAccessDeniedDialog],
  );

  return {
    secondMenuItems,
    handleUpgradePlanDialogClose,
    isLoggedIn,
    isUpgradePlanDialogOpened,
    topMenuItems,
  };
};
