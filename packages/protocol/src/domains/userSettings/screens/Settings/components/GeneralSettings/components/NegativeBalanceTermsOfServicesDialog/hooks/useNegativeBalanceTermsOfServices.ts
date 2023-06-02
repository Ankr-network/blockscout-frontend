import { useEffect, useMemo } from 'react';

import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePermissionsAndRole } from 'domains/userGroup/hooks/usePermissionsAndRole';
import { fetchNegativeBalanceTermsOfServicesStatus } from 'domains/userSettings/actions/negativeBalanceTermsOfServices/fetchNegativeBalanceTermsOfServicesStatus';
import { acceptNegativeBalanceTermsOfServices } from 'domains/userSettings/actions/negativeBalanceTermsOfServices/acceptNegativeBalanceTermsOfServices';
import { shouldShowNegativeBalanceOfServiceDialog } from 'domains/userSettings/utils/shouldShowNegativeBalanceOfServiceDialog';
import { useHasUserGroupDialog } from 'modules/common/components/UpgradePlanDialog/hooks/useHasUserGroupDialog';

export const useNegativeBalanceTermsOfServices = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const { address, isLoggedIn, hasPremium, loading: authLoading } = useAuth();
  const { isFinanceRole, isDevRole } = usePermissionsAndRole();

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
    if (address) {
      fetchTermsOfServices(
        selectedGroupAddress
          ? {
              group: selectedGroupAddress,
            }
          : undefined,
      );
    }
  }, [address, fetchTermsOfServices, selectedGroupAddress]);

  const shouldShowDialog = useMemo(
    () =>
      shouldShowNegativeBalanceOfServiceDialog(
        isLoggedIn,
        authLoading,
        isLoading,
        shouldShowUserGroupDialog,
        tosAccepted,
        isDevRole,
        hasPremium,
        isFinanceRole,
      ),
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
