import { useCallback } from 'react';

import { UpgradeAccountDialog } from 'modules/common/components/UpgradeAccountDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';

import {
  ContentType,
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from '../UpgradePlanDialog';

interface IUpgradeToPremiumPlanDialogProps {
  isPromoDialogOpened: boolean;
  onPromoDialogClose: () => void;
}

export const UpgradeToPremiumPlanDialog = ({
  isPromoDialogOpened,
  onPromoDialogClose,
}: IUpgradeToPremiumPlanDialogProps) => {
  const {
    isOpened: isOpenedUpgradePlan,
    onClose: onCloseUpgradePlan,
    onOpen: onOpenUpgradePlan,
  } = useUpgradePlanDialog();

  const handleOpenPlansDialog = useCallback(() => {
    onPromoDialogClose();
    onOpenUpgradePlan();
  }, [onOpenUpgradePlan, onPromoDialogClose]);

  const { isLoggedIn } = useAuth();

  return (
    <>
      <UpgradeAccountDialog
        isOpened={isPromoDialogOpened}
        handleClickSeePlans={handleOpenPlansDialog}
        handleClose={onPromoDialogClose}
      />
      <UpgradePlanDialog
        open={isOpenedUpgradePlan}
        onClose={onCloseUpgradePlan}
        defaultState={isLoggedIn ? ContentType.TOP_UP : ContentType.SIGN_UP}
      />
    </>
  );
};
