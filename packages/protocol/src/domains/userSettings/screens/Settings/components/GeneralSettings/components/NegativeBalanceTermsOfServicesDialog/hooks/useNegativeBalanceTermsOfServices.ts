import { useEffect, useMemo } from 'react';

import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { fetchNegativeBalanceTermsOfServicesStatus } from 'domains/userSettings/actions/negativeBalanceTermsOfServices/fetchNegativeBalanceTermsOfServicesStatus';
import { acceptNegativeBalanceTermsOfServices } from 'domains/userSettings/actions/negativeBalanceTermsOfServices/acceptNegativeBalanceTermsOfServices';
import { shouldShowNegativeBalanceOfServiceDialog } from 'domains/userSettings/utils/shouldShowNegativeBalanceOfServiceDialog';
import { useHasUserGroupDialog } from 'modules/common/components/UpgradePlanDialog/hooks/useHasUserGroupDialog';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

export const useNegativeBalanceTermsOfServices = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isLoggedIn, hasPremium, loading: authLoading } = useAuth();

  const hasGroupAccess = useGuardUserGroup({
    blockName: BlockWithPermission.TosStatus,
  });

  const shouldShowUserGroupDialog = useHasUserGroupDialog();

  const { isEnterpriseClient, isLoadingEnterpriseStatus } =
    useEnterpriseClientStatus();

  const [
    fetchTermsOfServices,
    {
      data: { tosAccepted } = { tosAccepted: false },
      isError,
      isLoading,
      isFetching,
      isUninitialized,
    },
  ] = useQueryEndpoint(fetchNegativeBalanceTermsOfServicesStatus);

  const [
    acceptNegativeBalanceTermsOfServicesAction,
    { isLoading: isAcceptLoading },
  ] = useQueryEndpoint(acceptNegativeBalanceTermsOfServices);

  useEffect(() => {
    const shouldFetchTos =
      isLoggedIn &&
      !authLoading &&
      hasGroupAccess &&
      !isEnterpriseClient &&
      !isLoadingEnterpriseStatus;

    if (shouldFetchTos) {
      const fetchParams = group ? { group } : undefined;

      fetchTermsOfServices(fetchParams);
    }
  }, [
    authLoading,
    isLoggedIn,
    fetchTermsOfServices,
    group,
    hasGroupAccess,
    isEnterpriseClient,
    isLoadingEnterpriseStatus,
  ]);

  const shouldShowDialog = useMemo(
    () =>
      shouldShowNegativeBalanceOfServiceDialog({
        isLoggedIn,
        authLoading,
        isLoading,
        isFetching,
        isUninitialized,
        shouldShowUserGroupDialog,
        tosAccepted,
        hasPremium,
        hasGroupAccess,
        isError,
        isEnterpriseClient,
        isLoadingEnterpriseStatus,
      }),
    [
      isLoggedIn,
      authLoading,
      isLoading,
      isFetching,
      isUninitialized,
      shouldShowUserGroupDialog,
      tosAccepted,
      hasPremium,
      hasGroupAccess,
      isError,
      isEnterpriseClient,
      isLoadingEnterpriseStatus,
    ],
  );

  return {
    isAcceptLoading,
    shouldShowDialog,
    acceptNegativeBalanceTermsOfServices:
      acceptNegativeBalanceTermsOfServicesAction,
  };
};
