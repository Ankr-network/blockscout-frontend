import { useEffect } from 'react';
import { Web3Address } from 'multirpc-sdk';

import { useLazyGetUserGroupsQuery } from 'modules/groups/actions/getUserGroups';

interface ClientGroupProps {
  address: Web3Address;
}

export const useClientGroups = ({ address }: ClientGroupProps) => {
  const [fetch, { data = [], isLoading, isFetching }] =
    useLazyGetUserGroupsQuery();

  useEffect(() => {
    fetch({
      user_address: address,
    });
  }, [fetch, address]);

  return { userGroups: data, isLoadingUserGroups: isLoading || isFetching };
};
