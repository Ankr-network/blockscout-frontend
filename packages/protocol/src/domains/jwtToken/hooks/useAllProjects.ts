import {
  IUserJwtToken,
  useFetchAllJwtTokenRequestsQuery,
} from '../action/getAllJwtToken';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

const defaultData: IUserJwtToken = {
  jwtTokens: [],
};

export const useAllProjects = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { data: { jwtTokens } = defaultData, isLoading } =
    useFetchAllJwtTokenRequestsQuery({ group });

  return { isLoading, jwtTokens };
};
