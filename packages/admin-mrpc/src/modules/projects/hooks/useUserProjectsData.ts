import { Web3Address } from 'multirpc-sdk';
import { useLazyGetUserProjectsQuery } from '../actions/getUserProjects';
import { useEffect } from 'react';

export const useUserProjectsData = (address: Web3Address) => {
  const [fetchUserProjects, { data: userProjectsData, isLoading, isFetching }] =
    useLazyGetUserProjectsQuery();

  useEffect(() => {
    fetchUserProjects({ address });
  }, [address, fetchUserProjects]);

  return {
    userProjectsData,
    isLoadingUserProjects: isLoading || isFetching,
  };
};
