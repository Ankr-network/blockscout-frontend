import { useUserGroupFetchGroupJwtQuery } from '../actions/fetchGroupJwt';
import { useSelectedUserGroup } from './useSelectedUserGroup';

export const useGroupJwtToken = () => {
  const { selectedGroupAddress, isGroupSelected } = useSelectedUserGroup();

  const { data: groupToken, isLoading: isLoadingGroupToken } =
    useUserGroupFetchGroupJwtQuery({ group: selectedGroupAddress });

  return {
    groupToken: isGroupSelected ? groupToken : undefined,
    isLoadingGroupToken,
  };
};
