import { selectIsAccountEligible } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { usePersonalPremiumStatus } from 'modules/referralProgram/hooks/usePersonalPremiumStatus';
import { useReferrer } from 'modules/referralProgram/hooks/useReferrer';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useUserGroupConfig } from 'domains/userGroup/hooks/useUserGroupConfig';

export const useHasReferralCodeButton = () => {
  const { isPersonal } = useSelectedUserGroup();
  const { selectedGroupAddress } = useUserGroupConfig();
  const { personalPremiumStatus } = usePersonalPremiumStatus({
    skipFetching: true,
  });
  const { referrer } = useReferrer({ skipFetching: true });

  const isAccountEligible = useAppSelector(selectIsAccountEligible);

  const isPersonalPremiumStatusLoaded = personalPremiumStatus !== undefined;
  const isGroupSelected = Boolean(selectedGroupAddress);
  const hasReferrer = Boolean(referrer);

  const hasReferralCodeButton =
    isAccountEligible &&
    isPersonal &&
    isGroupSelected &&
    isPersonalPremiumStatusLoaded &&
    !hasReferrer;

  return { hasReferralCodeButton };
};
