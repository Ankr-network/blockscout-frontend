import { IApiUserGroupParams, ISubscriptionsResponse } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useLazyAccountFetchSubscriptionsDataQuery } from 'domains/account/actions/fetchMySubscriptionsData';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

const defaultData: ISubscriptionsResponse = {
  items: [],
};

export interface FetchSubscriptionsParams {
  hasPremium: boolean;
}

export type FetchSubscriptions = [
  (params: IApiUserGroupParams) => void,
  ISubscriptionsResponse,
  boolean,
];

export const useFetchSubscriptions = ({
  hasPremium,
}: FetchSubscriptionsParams): FetchSubscriptions => {
  const [fetchSubscriptionsData, { data = defaultData, isLoading }] =
    useLazyAccountFetchSubscriptionsDataQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const hasAccess = useGuardUserGroup({
    blockName: BlockWithPermission.Billing,
  });

  useEffect(() => {
    if (hasPremium || hasAccess) {
      fetchSubscriptionsData({ group });
    }
  }, [fetchSubscriptionsData, hasPremium, hasAccess, group]);

  return [fetchSubscriptionsData, data, isLoading];
};
