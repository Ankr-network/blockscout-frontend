import { useEffect } from 'react';

import { isXaiReferralCode } from 'modules/referralProgram/utils/isXaiReferralCode';
import { selectIsAccountEligible } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePersonalPremiumStatus } from 'modules/referralProgram/hooks/usePersonalPremiumStatus';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useUserGroupConfig } from 'domains/userGroup/hooks/useUserGroupConfig';

export interface IUseInitReferralFlowWithSavedCodeProps {
  handleIneligibleAccountDialogOpen: () => void;
  handleSwitchAccountDialogOpen: () => void;
  handleWelcomeDialogOpen: () => void;
}

export const useInitReferralFlowWithSavedCode = ({
  handleIneligibleAccountDialogOpen,
  handleSwitchAccountDialogOpen,
  handleWelcomeDialogOpen,
}: IUseInitReferralFlowWithSavedCodeProps) => {
  const { isLoggedIn } = useAuth();
  const { selectedGroupAddress } = useUserGroupConfig();
  const { isPersonal } = useSelectedUserGroup();
  const { personalPremiumStatus } = usePersonalPremiumStatus({
    skipFetching: !isLoggedIn,
  });
  const { savedReferralCode } = useSavedReferralCode();

  const isAccountEligible = useAppSelector(selectIsAccountEligible);

  const isGroupSelected = Boolean(selectedGroupAddress);
  const isPersonalPremiumStatusLoaded = personalPremiumStatus !== undefined;
  const isPersonalGroupFreemium = Boolean(personalPremiumStatus?.isFreemium);

  useEffect(() => {
    if (isXaiReferralCode(savedReferralCode) && isLoggedIn) {
      if (isPersonalPremiumStatusLoaded && isGroupSelected) {
        if (isAccountEligible) {
          handleWelcomeDialogOpen();
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
    isGroupSelected,
    isLoggedIn,
    isPersonal,
    isPersonalGroupFreemium,
    isPersonalPremiumStatusLoaded,
    savedReferralCode,
  ]);
};
