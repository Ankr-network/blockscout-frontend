import { useEffect } from 'react';

import { getReferralCodeFromUrl } from 'modules/referralProgram/utils/getReferralCodeFromUrl';
import { isXaiReferralCode } from 'modules/referralProgram/utils/isXaiReferralCode';
import { oauthSignout } from 'domains/oauth/actions/signout';
import { selectIsAccountEligible } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useApplyReferralCode } from 'modules/referralProgram/hooks/useApplyReferralCode';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePersonalPremiumStatus } from 'modules/referralProgram/hooks/usePersonalPremiumStatus';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useUserGroupConfig } from 'domains/userGroup/hooks/useUserGroupConfig';

export interface IUseInitReferralFlowProps {
  handleIneligibleAccountDialogOpen: () => void;
  handleSuccessDialogOpen: () => void;
  handleSwitchAccountDialogOpen: () => void;
  handleWelcomeDialogOpen: () => void;
  hasLoggedIn: boolean;
  isBannerLoaded: boolean;
}

export const useInitiReferralFlow = ({
  handleIneligibleAccountDialogOpen,
  handleSuccessDialogOpen,
  handleSwitchAccountDialogOpen,
  handleWelcomeDialogOpen,
  hasLoggedIn,
  isBannerLoaded,
}: IUseInitReferralFlowProps) => {
  const { isLoggedIn } = useAuth();
  const { isPersonal } = useSelectedUserGroup();
  const { personalPremiumStatus } = usePersonalPremiumStatus({
    skipFetching: !isLoggedIn,
  });
  const { selectedGroupAddress } = useUserGroupConfig();

  const { isUninitialized: isSignOutNotStarted } = useAppSelector(
    oauthSignout.select(),
  );
  const isAccountEligible = useAppSelector(selectIsAccountEligible);

  const { referralCode } = getReferralCodeFromUrl();

  const isPersonalPremiumStatusLoaded = personalPremiumStatus !== undefined;
  const isPersonalGroupFreemium = Boolean(personalPremiumStatus?.isFreemium);
  const isGroupSelected = Boolean(selectedGroupAddress);

  const { handleApplyReferralCode } = useApplyReferralCode({
    hasSuccessNotification: false,
    onSuccess: handleSuccessDialogOpen,
    referralCode,
    // needs to display Success dialog correctly
    shouldRemoveSavedData: false,
  });

  useEffect(() => {
    const shouldInitReferralFlow =
      isXaiReferralCode(referralCode) &&
      isBannerLoaded &&
      // to prevent showing welcome dialog for a short time after signing out
      isSignOutNotStarted;

    // TODO: rethink this logcis to get rid of nested if's
    if (shouldInitReferralFlow) {
      if (isLoggedIn) {
        if (isPersonalPremiumStatusLoaded && isGroupSelected) {
          if (isAccountEligible) {
            if (hasLoggedIn) {
              handleApplyReferralCode();
            } else {
              handleWelcomeDialogOpen();
            }
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
    isSignOutNotStarted,
    referralCode,
  ]);
};
