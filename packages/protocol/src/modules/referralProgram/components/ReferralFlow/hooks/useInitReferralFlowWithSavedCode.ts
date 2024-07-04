import { useEffect } from 'react';

import { isXaiReferralCode } from 'modules/referralProgram/utils/isXaiReferralCode';
import { selectIsAccountEligible } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';
import { useUserGroupConfig } from 'domains/userGroup/hooks/useUserGroupConfig';

export interface IUseInitReferralFlowWithSavedCodeProps {
  handleIneligibleAccountDialogOpen: () => void;
  handleWelcomeDialogOpen: () => void;
}

export const useInitReferralFlowWithSavedCode = ({
  handleIneligibleAccountDialogOpen,
  handleWelcomeDialogOpen,
}: IUseInitReferralFlowWithSavedCodeProps) => {
  const { isLoggedIn, isPremiumStatusLoaded } = useAuth();
  const { selectedGroupAddress } = useUserGroupConfig();

  const isGroupSelected = Boolean(selectedGroupAddress);

  const isAccountEligible = useAppSelector(selectIsAccountEligible);
  const { savedReferralCode } = useSavedReferralCode();

  useEffect(() => {
    if (isXaiReferralCode(savedReferralCode) && isLoggedIn) {
      if (isPremiumStatusLoaded && isGroupSelected) {
        if (isAccountEligible) {
          handleWelcomeDialogOpen();
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
    isPremiumStatusLoaded,
    savedReferralCode,
  ]);
};
