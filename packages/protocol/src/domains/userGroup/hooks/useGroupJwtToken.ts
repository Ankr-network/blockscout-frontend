import { useLazyUserGroupFetchGroupJwtQuery } from 'domains/userGroup/actions/fetchGroupJwt';
import { useSelectedUserGroup } from './useSelectedUserGroup';

export const useGroupJwtToken = () => {
  const { selectedGroupJwt } = useSelectedUserGroup();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_fetch, { isLoading: isLoadingGroupToken }] =
    useLazyUserGroupFetchGroupJwtQuery();

  return {
    groupToken: selectedGroupJwt,
    isLoadingGroupToken,
  };
};
