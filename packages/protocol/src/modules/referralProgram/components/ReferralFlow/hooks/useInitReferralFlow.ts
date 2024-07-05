import { useEffect } from 'react';

import { getReferralCode } from 'modules/referralProgram/utils/getReferralCode';
import { isXaiReferralCode } from 'modules/referralProgram/utils/isXaiReferralCode';
import { selectIsAccountEligible } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePersonalPremiumStatus } from 'modules/referralProgram/hooks/usePersonalPremiumStatus';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useUserGroupConfig } from 'domains/userGroup/hooks/useUserGroupConfig';

export interface IUseInitReferralFlowProps {
  handleIneligibleAccountDialogOpen: () => void;
  handleSwitchAccountDialogOpen: () => void;
  handleWelcomeDialogOpen: () => void;
}

export const useInitiReferralFlow = ({
  handleIneligibleAccountDialogOpen,
  handleSwitchAccountDialogOpen,
  handleWelcomeDialogOpen,
}: IUseInitReferralFlowProps) => {
  const { isLoggedIn } = useAuth();
  const { isPersonal } = useSelectedUserGroup();
  const { personalPremiumStatus } = usePersonalPremiumStatus({
    skipFetching: !isLoggedIn,
  });
  const { selectedGroupAddress } = useUserGroupConfig();

  const isAccountEligible = useAppSelector(selectIsAccountEligible);

  const { referralCode } = getReferralCode();

  const isPersonalPremiumStatusLoaded = personalPremiumStatus !== undefined;
  const isPersonalGroupFreemium = Boolean(personalPremiumStatus?.isFreemium);
  const isGroupSelected = Boolean(selectedGroupAddress);

  useEffect(() => {
    if (isXaiReferralCode(referralCode)) {
      if (isLoggedIn) {
        if (isPersonalPremiumStatusLoaded && isGroupSelected) {
          if (isAccountEligible) {
            handleWelcomeDialogOpen();
          } else if (!isPersonal && isPersonalGroupFreemium) {
            handleSwitchAccountDialogOpen();
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
  }, [
    isAccountEligible,
    isGroupSelected,
    isPersonalGroupFreemium,
    isPersonalPremiumStatusLoaded,
    referralCode,
  ]);
};
