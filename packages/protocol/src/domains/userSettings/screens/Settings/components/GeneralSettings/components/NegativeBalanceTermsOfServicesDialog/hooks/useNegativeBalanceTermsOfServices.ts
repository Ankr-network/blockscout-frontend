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
import { useAppSelector } from 'store/useAppSelector';
import { selectJwtTokensLoadingState } from 'domains/jwtToken/store/selectors';

export const useNegativeBalanceTermsOfServices = () => {
  const { selectedGroupAddress: group, isLoadingGroups } =
    useSelectedUserGroup();

  const { isLoggedIn, hasPremium, loading: authLoading } = useAuth();

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
      isLoading: isLoadingTosAcceptStatus,
      isFetching: isFetchingTosAcceptStatus,
      isUninitialized: isUninitializedTosAcceptStatus,
    },
  ] = useQueryEndpoint(fetchNegativeBalanceTermsOfServicesStatus);

  const [
    acceptNegativeBalanceTermsOfServicesAction,
    { isLoading: isAcceptLoading },
  ] = useQueryEndpoint(acceptNegativeBalanceTermsOfServices);

  const isLoadingJwtTokens = useAppSelector(selectJwtTokensLoadingState);

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
        isLoadingJwtTokens,
      }),
    [
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
      isLoadingJwtTokens,
    ],
  );

  return {
    isAcceptLoading,
    shouldShowDialog,
    acceptNegativeBalanceTermsOfServices:
      acceptNegativeBalanceTermsOfServicesAction,
  };
};
