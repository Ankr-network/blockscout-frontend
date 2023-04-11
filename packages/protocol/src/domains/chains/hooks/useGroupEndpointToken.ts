import { useEffect } from 'react';
import { useUserGroupFetchGroupJwtQuery } from 'domains/userGroup/actions/fetchGroupJwt';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useGroupEndpointToken = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const { data: groupToken, refetch } = useUserGroupFetchGroupJwtQuery();

  useEffect(() => {
    refetch();
    // we need to refetch the data on group change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroupAddress]);

  if (selectedGroupAddress) {
    return groupToken;
  }

  return undefined;
};
