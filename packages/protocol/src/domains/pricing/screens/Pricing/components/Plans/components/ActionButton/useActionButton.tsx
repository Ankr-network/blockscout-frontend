import { useCallback } from 'react';
import { GroupUserRole } from 'multirpc-sdk';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { isButtonDisabled } from 'domains/pricing/screens/Pricing/components/Plans/utils/isButtonDisabled';
import { isCurrentPlanButton } from 'domains/pricing/screens/Pricing/components/Plans/utils/isCurrentPlanButton';
import { selectActiveChargingModel } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useFreemiumChargingModel } from 'domains/account/screens/BillingPage/hooks/useFreemiumChargingModel';
import { useUserGroupConfig } from 'domains/userGroup/hooks/useUserGroupConfig';
import {
  ContentType,
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { EGeneralPlanList } from '../../PlansUtils';
import { useHandlersClick } from '../../hooks/useHandlersClick';

export interface IUseActionButtonProps {
  planName: EGeneralPlanList;
  clickCallback?: () => void;
}

export const useActionButton = ({
  clickCallback,
  planName,
}: IUseActionButtonProps) => {
  const { selectedGroupRole } = useUserGroupConfig();

  const { hasOauthLogin, hasPremium, isLoggedIn } = useAuth();

  const currentChargingModel = useAppSelector(selectActiveChargingModel);
  const { shouldShowFreemium } = useFreemiumChargingModel(currentChargingModel);

  const {
    isOpened: isTopupOpened,
    onClose: onCloseTopup,
    onOpen: onOpenTopupDialog,
  } = useUpgradePlanDialog();
  const {
    isOpened: isSignupDialogOpened,
    onClose: onCloseSignupDialog,
    onOpen: onOpenSignupDialog,
  } = useDialog();

  const isFreePlan = planName === EGeneralPlanList.Free;
  const isPAYGPlan = planName === EGeneralPlanList.PayAsYouGo;
  const isDealPlan = planName === EGeneralPlanList.Deal;
  const isDeveloperRole = selectedGroupRole === GroupUserRole.dev;

  const isButtonDisabledValue = isButtonDisabled({
    hasPremium,
    isDeveloperRole,
    isLoggedIn,
    planName,
  });
  const isCurrentPlan = isCurrentPlanButton({
    isDeveloperRole,
    isLoggedIn,
    planName,
    chargingType: currentChargingModel.type,
  });

  const {
    billingPageRedirect,
    chainsPageRedirect,
    openSignupDialog,
    openTopUpDialog,
  } = useHandlersClick({
    isLoggedIn,
    onOpenSignupDialog,
    onOpenTopupDialog,
    clickCallback,
  });

  const renderDialogs = useCallback(() => {
    return (
      <>
        {isLoggedIn && (
          <UpgradePlanDialog
            defaultState={ContentType.TOP_UP}
            onClose={onCloseTopup}
            open={isTopupOpened}
          />
        )}
        <SignupDialog
          canProcessReferralCode
          hasOauthLogin={hasOauthLogin}
          isOpen={isSignupDialogOpened}
          onClose={onCloseSignupDialog}
        />
      </>
    );
  }, [
    isLoggedIn,
    isTopupOpened,
    onCloseTopup,
    isSignupDialogOpened,
    onCloseSignupDialog,
    hasOauthLogin,
  ]);

  return {
    isButtonDisabledValue,
    isCurrentPlan,
    isFreePlan,
    isPAYGPlan,
    isDealPlan,
    isLoggedIn,
    shouldShowFreemium,
    billingPageRedirect,
    chainsPageRedirect,
    openTopUpDialog,
    openSignupDialog,
    renderDialogs,
  };
};
