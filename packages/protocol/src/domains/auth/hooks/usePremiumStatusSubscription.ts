import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { EMilliSeconds } from 'modules/common/constants/const';
import { useAppSelector } from 'store/useAppSelector';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';

import { selectUserEndpointToken } from '../store';
import { useEnterpriseClientStatus } from './useEnterpriseClientStatus';
import { useFetchPremiumStatusQuery } from '../actions/fetchPremiumStatus';

export const usePremiumStatusSubscription = () => {
  const userEndpointToken = useAppSelector(selectUserEndpointToken);

  const { groupToken } = useGroupJwtToken();

  const hasAccess = useGuardUserGroup({
    blockName: BlockWithPermission.AccountStatus,
  });

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const token = groupToken?.jwtToken ?? userEndpointToken ?? '';
  const shouldSkipFetching =
    !token || !hasAccess || isEnterpriseClient || isEnterpriseStatusLoading;

  const { isUninitialized } = useFetchPremiumStatusQuery(token, {
    pollingInterval: 30 * EMilliSeconds.Second,
    refetchOnMountOrArgChange: true,
    skip: shouldSkipFetching,
  });

  return { isUninitialized };
};
