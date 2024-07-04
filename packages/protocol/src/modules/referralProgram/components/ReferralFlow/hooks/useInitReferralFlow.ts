import { useEffect } from 'react';

import { isXaiReferralCode } from 'modules/referralProgram/utils/isXaiReferralCode';
import { selectIsAccountEligible } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useReferralCode } from 'modules/referralProgram/hooks/useReferralCode';
import { useUserGroupConfig } from 'domains/userGroup/hooks/useUserGroupConfig';

export interface IUseInitReferralFlowProps {
  handleIneligibleAccountDialogOpen: () => void;
  handleWelcomeDialogOpen: () => void;
}

export const useInitiReferralFlow = ({
  handleIneligibleAccountDialogOpen,
  handleWelcomeDialogOpen,
}: IUseInitReferralFlowProps) => {
  const { isLoggedIn, isPremiumStatusLoaded } = useAuth();
  const { selectedGroupAddress } = useUserGroupConfig();

  const isGroupSelected = Boolean(selectedGroupAddress);

  const isAccountEligible = useAppSelector(selectIsAccountEligible);
  const { referralCode } = useReferralCode();

  useEffect(() => {
    if (isXaiReferralCode(referralCode)) {
      if (isLoggedIn) {
        if (isPremiumStatusLoaded && isGroupSelected) {
          if (isAccountEligible) {
            handleWelcomeDialogOpen();
          } else {
            handleIneligibleAccountDialogOpen();
          }
        }
      } else {
        handleWelcomeDialogOpen();
      }
    }
    // Only data should be tracked, not callbacks
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGroupSelected, isPremiumStatusLoaded, referralCode]);
};
