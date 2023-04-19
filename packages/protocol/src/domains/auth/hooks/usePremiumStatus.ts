import { useEffect } from 'react';

import { Options } from 'hooks/useQueryEndpoint';
import { useAppSelector } from 'store/useAppSelector';
import { selectUserEndpointToken } from 'domains/auth/store/selectors';
import { useLazyFetchPremiumStatusQuery } from 'domains/auth/actions/fetchPremiumStatus';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

const options: Options['subscriptionOptions'] = {
  pollingInterval: 30_000,
};

export const usePremiumStatus = () => {
  const userEndpointToken = useAppSelector(selectUserEndpointToken);

  const { groupToken, isLoadingGroupToken } = useGroupJwtToken();

  const [fetch, { data: status, isLoading }] =
    useLazyFetchPremiumStatusQuery(options);

  const hasAccess = useGuardUserGroup({
    blockName: BlockWithPermission.Status,
  });

  useEffect(() => {
    if (!hasAccess) {
      return () => {};
    }

    if (groupToken?.jwtToken) {
      const { unsubscribe } = fetch(groupToken?.jwtToken);

      return unsubscribe;
    }

    if (userEndpointToken) {
      const { unsubscribe } = fetch(userEndpointToken);

      return unsubscribe;
    }

    return () => {};
  }, [hasAccess, fetch, userEndpointToken, groupToken]);

  return { status, isLoading: isLoadingGroupToken || isLoading };
};
