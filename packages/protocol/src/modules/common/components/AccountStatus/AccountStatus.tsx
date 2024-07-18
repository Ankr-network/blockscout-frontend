import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { UserLabel } from 'uiKit/UserLabel';
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
      hasPremium={hasPremium}
      hasEnterpriseStatus={isEnterpriseClient}
      hasStatusTransition={hasStatusTransition}
      isLoading={loading || isEnterpriseStatusLoading}
      size="medium"
    />
  );
};
