import { useEffect } from 'react';

import { selectIsAccountEligible } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useApplyReferralCode } from 'modules/referralProgram/hooks/useApplyReferralCode';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePersonalPremiumStatus } from 'modules/referralProgram/hooks/usePersonalPremiumStatus';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useUserGroupConfig } from 'domains/userGroup/hooks/useUserGroupConfig';
import { useValidateReferralCode } from 'modules/referralProgram/hooks/useValidateReferralCode';

export interface IUseInitReferralFlowWithSavedCodeProps {
  handleIneligibleAccountDialogOpen: () => void;
  handleSuccessDialogOpen: () => void;
  handleSwitchAccountDialogOpen: () => void;
  isBannerLoaded: boolean;
}

export const useInitReferralFlowWithSavedCode = ({
  handleIneligibleAccountDialogOpen,
  handleSuccessDialogOpen,
  handleSwitchAccountDialogOpen,
  isBannerLoaded,
}: IUseInitReferralFlowWithSavedCodeProps) => {
  const { isLoggedIn } = useAuth();
  const { selectedGroupAddress } = useUserGroupConfig();
  const { isPersonal } = useSelectedUserGroup();
  const { personalPremiumStatus } = usePersonalPremiumStatus({
    skipFetching: !isLoggedIn,
  });
  const { handleRemoveSavedReferralCode, savedReferralCode } =
    useSavedReferralCode();

  const { handleApplyReferralCode } = useApplyReferralCode({
    hasSuccessNotification: false,
    onError: handleRemoveSavedReferralCode,
    onSuccess: handleSuccessDialogOpen,
    referralCode: savedReferralCode,
    // needs to display Success dialog correctly
    shouldRemoveSavedData: false,
  });

  const isAccountEligible = useAppSelector(selectIsAccountEligible);

  const isGroupSelected = Boolean(selectedGroupAddress);
  const isPersonalPremiumStatusLoaded = personalPremiumStatus !== undefined;
  const isPersonalGroupFreemium = Boolean(personalPremiumStatus?.isFreemium);

  const { validateReferralCode } = useValidateReferralCode();

  useEffect(() => {
    const error = validateReferralCode(savedReferralCode);

    if (!error && isLoggedIn && isBannerLoaded) {
      if (isPersonalPremiumStatusLoaded && isGroupSelected) {
        if (isAccountEligible) {
          handleApplyReferralCode();
        } else if (!isPersonal && isPersonalGroupFreemium) {
          handleSwitchAccountDialogOpen();
        } else {
          handleIneligibleAccountDialogOpen();
        }
      }
    }
    // Only data should be tracked, not callbacks
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isAccountEligible,
    isBannerLoaded,
    isGroupSelected,
    isLoggedIn,
    isPersonal,
    isPersonalGroupFreemium,
    isPersonalPremiumStatusLoaded,
    savedReferralCode,
  ]);
};
