import { useLazyUserGroupFetchGroupJwtQuery } from 'domains/userGroup/actions/fetchGroupJwt';
import { useSelectedUserGroup } from './useSelectedUserGroup';

export const useGroupJwtToken = () => {
  const { selectedGroupJwt } = useSelectedUserGroup();

  const [, { isLoading: isLoadingGroupToken }] =
    useLazyUserGroupFetchGroupJwtQuery();

  return {
    groupToken: selectedGroupJwt,
    isLoadingGroupToken,
  };
};
