import { useEffect, useMemo } from 'react';

import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePermissionsAndRole } from 'domains/userGroup/hooks/usePermissionsAndRole';
import { fetchNegativeBalanceTermsOfServicesStatus } from 'domains/userSettings/actions/negativeBalanceTermsOfServices/fetchNegativeBalanceTermsOfServicesStatus';
import { acceptNegativeBalanceTermsOfServices } from 'domains/userSettings/actions/negativeBalanceTermsOfServices/acceptNegativeBalanceTermsOfServices';
import { shouldShowNegativeBalanceOfServiceDialog } from 'domains/userSettings/utils/shouldShowNegativeBalanceOfServiceDialog';
import { useHasUserGroupDialog } from 'modules/common/components/UpgradePlanDialog/hooks/useHasUserGroupDialog';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

export const useNegativeBalanceTermsOfServices = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const { address, isLoggedIn, hasPremium, loading: authLoading } = useAuth();

  const { isFinanceRole, isDevRole } = usePermissionsAndRole();

  const hasGroupAccess = useGuardUserGroup({
    blockName: BlockWithPermission.TosStatus,
  });

  const shouldShowUserGroupDialog = useHasUserGroupDialog();

  const [
    fetchTermsOfServices,
    { data: { tosAccepted } = { tosAccepted: false }, isLoading },
  ] = useQueryEndpoint(fetchNegativeBalanceTermsOfServicesStatus);

  const [
    acceptNegativeBalanceTermsOfServicesAction,
    { isLoading: isAcceptLoading },
  ] = useQueryEndpoint(acceptNegativeBalanceTermsOfServices);

  useEffect(() => {
    if (address && hasGroupAccess) {
      fetchTermsOfServices(
        selectedGroupAddress
          ? {
              group: selectedGroupAddress,
            }
          : undefined,
      );
    }
  }, [address, fetchTermsOfServices, selectedGroupAddress, hasGroupAccess]);

  const shouldShowDialog = useMemo(
    () =>
      shouldShowNegativeBalanceOfServiceDialog({
        isLoggedIn,
        authLoading,
        isLoading,
        shouldShowUserGroupDialog,
        tosAccepted,
        isDevRole,
        hasPremium,
        isFinanceRole,
      }),
    [
      isLoggedIn,
      authLoading,
      isLoading,
      shouldShowUserGroupDialog,
      tosAccepted,
      isDevRole,
      hasPremium,
      isFinanceRole,
    ],
  );

  return {
    isAcceptLoading,
    shouldShowDialog,
    acceptNegativeBalanceTermsOfServices:
      acceptNegativeBalanceTermsOfServicesAction,
  };
};
