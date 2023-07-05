import { useEffect } from 'react';
import {
  IUserJwtToken,
  useLazyFetchAllJwtTokenRequestsQuery,
} from '../action/getAllJwtToken';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

const defaultData: IUserJwtToken = {
  jwtTokens: [],
};

export const useAllProjects = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [
    fetchProjects,
    { data: { jwtTokens } = defaultData, isLoading, isFetching },
  ] = useLazyFetchAllJwtTokenRequestsQuery();

  const loading = isLoading || isFetching;

  useEffect(() => {
    fetchProjects({ loading, group });
    // we don't want to refetch projects when loading changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProjects, group]);

  return { isLoading: loading, jwtTokens };
};
