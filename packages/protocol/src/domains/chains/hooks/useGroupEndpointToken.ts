import { useUserGroupFetchGroupJwtQuery } from 'domains/userGroup/actions/fetchGroupJwt';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useGroupEndpointToken = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const { data } = useUserGroupFetchGroupJwtQuery({
    group: selectedGroupAddress,
  });

  if (selectedGroupAddress) {
    return data?.jwtToken;
  }

  return undefined;
};
