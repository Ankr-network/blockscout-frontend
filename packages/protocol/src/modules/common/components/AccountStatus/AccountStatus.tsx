import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { UserLabel } from 'uiKit/UserLabel';
import { selectHasPromoBundle } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useMyBundlesStatus } from 'domains/account/hooks/useMyBundlesStatus';
import { useReferrer } from 'modules/referralProgram/hooks/useReferrer';

import { PublicBadge } from '../PublicBadge';

interface IAccountStatusProps {
  className?: string;
  isOnWhiteBackground?: boolean;
}

export const AccountStatus = ({
  className,
  isOnWhiteBackground,
}: IAccountStatusProps) => {
  const hasPromoBundle = useAppSelector(selectHasPromoBundle);
  const {
    hasPremium,
    hasStatusTransition,
    isLoggedIn,
    loading: isAuthDataLoading,
  } = useAuth();

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const { isLoading: isReferrerLoading } = useReferrer({
    skipFetching: !isLoggedIn,
  });
  const { initLoading: isMyBundlesStatusLoading } = useMyBundlesStatus();

  const hasAccessToAccountStatus = useGuardUserGroup({
    blockName: BlockWithPermission.AccountStatus,
  });

  if (!isLoggedIn) {
    return (
      <PublicBadge
        className={className}
        isOnWhiteBackground={isOnWhiteBackground}
      />
    );
  }

  if (!hasAccessToAccountStatus) {
    return null;
  }

  const isStatusDataLoading =
    isAuthDataLoading ||
    isEnterpriseStatusLoading ||
    isReferrerLoading ||
    isMyBundlesStatusLoading;

  return (
    <UserLabel
      className={className}
      hasEnterpriseStatus={isEnterpriseClient}
      hasPremium={hasPremium}
      hasStatusTransition={hasStatusTransition}
      isLoading={isStatusDataLoading}
      isPromo={hasPromoBundle}
      size="medium"
    />
  );
};
