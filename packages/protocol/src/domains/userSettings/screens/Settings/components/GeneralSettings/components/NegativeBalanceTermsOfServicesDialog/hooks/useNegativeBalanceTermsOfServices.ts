import { useEffect, useMemo } from 'react';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { acceptNegativeBalanceTermsOfServices } from 'domains/userSettings/actions/negativeBalanceTermsOfServices/acceptNegativeBalanceTermsOfServices';
import { fetchNegativeBalanceTermsOfServicesStatus } from 'domains/userSettings/actions/negativeBalanceTermsOfServices/fetchNegativeBalanceTermsOfServicesStatus';
import { shouldShowNegativeBalanceOfServiceDialog } from 'domains/userSettings/utils/shouldShowNegativeBalanceOfServiceDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useFetchJWTs } from 'domains/jwtToken/hooks/useFetchJWTs';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useHasUserGroupDialog } from 'modules/common/components/UpgradePlanDialog/hooks/useHasUserGroupDialog';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useNegativeBalanceTermsOfServices = () => {
  const { isLoadingGroups, selectedGroupAddress: group } =
    useSelectedUserGroup();

  const { hasPremium, isLoggedIn, loading: authLoading } = useAuth();

  const hasGroupAccess = useGuardUserGroup({
    blockName: BlockWithPermission.TosStatus,
  });

  const shouldShowUserGroupDialog = useHasUserGroupDialog();

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const [
    fetchTermsOfServices,
    {
      data: { tosAccepted } = { tosAccepted: false },
      isError: isErrorTosAcceptStatus,
      isFetching: isFetchingTosAcceptStatus,
      isLoading: isLoadingTosAcceptStatus,
      isUninitialized: isUninitializedTosAcceptStatus,
    },
  ] = useQueryEndpoint(fetchNegativeBalanceTermsOfServicesStatus);

  const { isLoading: jwtsLoading } = useFetchJWTs({
    group,
    skipFetching: true,
  });

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
      !isEnterpriseStatusLoading;

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
    isEnterpriseStatusLoading,
  ]);

  const shouldShowDialog = useMemo(
    () =>
      shouldShowNegativeBalanceOfServiceDialog({
        isLoggedIn,
        authLoading,
        isLoadingTosAcceptStatus,
        isFetchingTosAcceptStatus,
        isUninitializedTosAcceptStatus,
        shouldShowUserGroupDialog,
        tosAccepted,
        hasPremium,
        hasGroupAccess,
        isErrorTosAcceptStatus,
        isEnterpriseClient,
        isEnterpriseStatusLoading,
        isLoadingGroups,
        isLoadingJwtTokens: jwtsLoading,
      }),
    [
      authLoading,
      hasGroupAccess,
      hasPremium,
      isEnterpriseClient,
      isEnterpriseStatusLoading,
      isErrorTosAcceptStatus,
      isFetchingTosAcceptStatus,
      isLoadingGroups,
      isLoadingTosAcceptStatus,
      isLoggedIn,
      isUninitializedTosAcceptStatus,
      jwtsLoading,
      shouldShowUserGroupDialog,
      tosAccepted,
    ],
  );

  return {
    isAcceptLoading,
    shouldShowDialog,
    acceptNegativeBalanceTermsOfServices:
      acceptNegativeBalanceTermsOfServicesAction,
  };
};
