import { ISubscriptionsResponse } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useLazyAccountFetchSubscriptionsDataQuery } from 'domains/account/actions/fetchMySubscriptionsData';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

const defaultData: ISubscriptionsResponse = {
  items: [],
};

export interface FetchSubscriptionsParams {
  hasPremium: boolean;
}

export type FetchSubscriptions = [() => void, ISubscriptionsResponse, boolean];

export const useFetchSubscriptions = ({
  hasPremium,
}: FetchSubscriptionsParams): FetchSubscriptions => {
  const [fetchSubscriptionsData, { data = defaultData, isLoading }] =
    useLazyAccountFetchSubscriptionsDataQuery();

  const hasAccess = useGuardUserGroup({
    blockName: BlockWithPermission.Billing,
  });

  useEffect(() => {
    if (hasPremium || hasAccess) {
      fetchSubscriptionsData();
    }
  }, [fetchSubscriptionsData, hasPremium, hasAccess]);

  return [fetchSubscriptionsData, data, isLoading];
};
