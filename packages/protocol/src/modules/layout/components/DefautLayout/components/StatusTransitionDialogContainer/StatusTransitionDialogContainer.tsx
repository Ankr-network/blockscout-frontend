import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { StatusTransitionDialog } from 'modules/layout/components/StatusTransitionDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

export const StatusTransitionDialogContainer = () => {
  const { isLoggedIn } = useAuth();
  const { isEnterpriseClient } = useEnterpriseClientStatus();

  if (!isLoggedIn || isEnterpriseClient) {
    return null;
  }

  return (
    <GuardUserGroup blockName={BlockWithPermission.Billing}>
      <StatusTransitionDialog />
    </GuardUserGroup>
  );
};
