import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { UserLabel } from 'uiKit/UserLabel';
import { selectIsPromo } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';

import { PublicBadge } from '../PublicBadge';

interface IAccountStatusProps {
  className?: string;
  isOnWhiteBackground?: boolean;
}

export const AccountStatus = ({
  className,
  isOnWhiteBackground,
}: IAccountStatusProps) => {
  const isPromo = useAppSelector(selectIsPromo);
  const { hasPremium, hasStatusTransition, isLoggedIn, loading } = useAuth();

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

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

  return (
    <UserLabel
      className={className}
      hasEnterpriseStatus={isEnterpriseClient}
      hasPremium={hasPremium}
      hasStatusTransition={hasStatusTransition}
      isLoading={loading || isEnterpriseStatusLoading}
      isPromo={isPromo}
      size="medium"
    />
  );
};
