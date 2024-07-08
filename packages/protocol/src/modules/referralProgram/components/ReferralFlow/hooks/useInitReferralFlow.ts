import { useEffect } from 'react';

import { getReferralCodeFromUrl } from 'modules/referralProgram/utils/getReferralCodeFromUrl';
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
  isBannerLoaded: boolean;
}

export const useInitiReferralFlow = ({
  handleIneligibleAccountDialogOpen,
  handleSwitchAccountDialogOpen,
  handleWelcomeDialogOpen,
  isBannerLoaded,
}: IUseInitReferralFlowProps) => {
  const { isLoggedIn } = useAuth();
  const { isPersonal } = useSelectedUserGroup();
  const { personalPremiumStatus } = usePersonalPremiumStatus({
    skipFetching: !isLoggedIn,
  });
  const { selectedGroupAddress } = useUserGroupConfig();

  const isAccountEligible = useAppSelector(selectIsAccountEligible);

  const { referralCode } = getReferralCodeFromUrl();

  const isPersonalPremiumStatusLoaded = personalPremiumStatus !== undefined;
  const isPersonalGroupFreemium = Boolean(personalPremiumStatus?.isFreemium);
  const isGroupSelected = Boolean(selectedGroupAddress);

  useEffect(() => {
    if (isXaiReferralCode(referralCode) && isBannerLoaded) {
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
    isBannerLoaded,
    isGroupSelected,
    isPersonalGroupFreemium,
    isPersonalPremiumStatusLoaded,
    referralCode,
  ]);
};
