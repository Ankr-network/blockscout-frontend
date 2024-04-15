import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { UserLabel } from 'uiKit/UserLabel';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

interface IAccountStatusProps {
  className?: string;
}

export const AccountStatus = ({ className }: IAccountStatusProps) => {
  const { loading, hasPremium, hasStatusTransition, isLoggedIn } = useAuth();

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const hasAccessToAccountStatus = useGuardUserGroup({
    blockName: BlockWithPermission.AccountStatus,
  });

  if (!isLoggedIn || !hasAccessToAccountStatus) {
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
