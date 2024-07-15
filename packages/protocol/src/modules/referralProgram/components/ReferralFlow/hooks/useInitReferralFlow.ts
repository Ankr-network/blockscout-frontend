import { useEffect } from 'react';

import { getReferralCodeFromUrl } from 'modules/referralProgram/utils/getReferralCodeFromUrl';
import { isXaiReferralCode } from 'modules/referralProgram/utils/isXaiReferralCode';
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
  isLoggingOut: boolean;
}

export const useInitiReferralFlow = ({
  handleIneligibleAccountDialogOpen,
  handleSuccessDialogOpen,
  handleSwitchAccountDialogOpen,
  handleWelcomeDialogOpen,
  hasLoggedIn,
  isBannerLoaded,
  isLoggingOut,
}: IUseInitReferralFlowProps) => {
  const { isLoggedIn, loading } = useAuth();
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

  const { handleApplyReferralCode } = useApplyReferralCode({
    hasSuccessNotification: false,
    onSuccess: handleSuccessDialogOpen,
    referralCode,
    // needs to display Success dialog correctly
    shouldRemoveSavedData: false,
  });

  useEffect(() => {
    // TODO: rethink this logcis to get rid of nested if's
    if (!isLoggingOut && !loading) {
      if (isXaiReferralCode(referralCode) && isBannerLoaded) {
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
    }
    // Only data should be tracked, not callbacks
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isAccountEligible,
    isBannerLoaded,
    isGroupSelected,
    isLoggingOut,
    isPersonalGroupFreemium,
    isPersonalPremiumStatusLoaded,
    loading,
    referralCode,
  ]);
};
