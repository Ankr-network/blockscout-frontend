import { useEffect } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import { Options } from 'hooks/useQueryEndpoint';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';
import { useLazyFetchPremiumStatusQuery } from '../actions/fetchPremiumStatus';
import { selectUserEndpointToken } from '../store/selectors';

const options: Options['subscriptionOptions'] = {
  pollingInterval: 30_000,
};

export const usePremiumStatusSubscription = () => {
  const userEndpointToken = useAppSelector(selectUserEndpointToken);

  const { groupToken } = useGroupJwtToken();

  const [fetch, { isUninitialized }] = useLazyFetchPremiumStatusQuery(options);

  const hasAccess = useGuardUserGroup({
    blockName: BlockWithPermission.AccountStatus,
  });

  useEffect(() => {
    const token = groupToken?.jwtToken || userEndpointToken;

    if (!hasAccess || !token) {
      return () => {};
    }

    if (token) {
      const { unsubscribe } = fetch(token);

      return unsubscribe;
    }

    return () => {};
  }, [fetch, groupToken?.jwtToken, hasAccess, userEndpointToken]);

  return { isUninitialized };
};
