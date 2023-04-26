import { useEffect } from 'react';
import { Web3Address } from 'multirpc-sdk';
import { useGetUserGroupsQuery } from 'modules/groups/actions/getUserGroups';

interface ClientGroupProps {
  address: Web3Address;
}

export const useClientGroups = ({ address }: ClientGroupProps) => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useGetUserGroupsQuery({
    user_address: address,
  });

  useEffect(() => {
    refetch();
  }, [refetch, address]);

  return { userGroups: data, isLoadingUserGroups: isLoading };
};
