import { useEffect } from 'react';
import { Web3Address } from 'multirpc-sdk';

import { useLazyFetchUserBundlesQuery } from 'modules/clients/actions/fetchUserBundles';
import { useLazyFetchUserBundlesStatusesQuery } from 'modules/clients/actions/fetchUserBundlesStatuses';

interface IUserBundlesProps {
  address: Web3Address;
}

export const useUserBundles = ({ address }: IUserBundlesProps) => {
  const [
    fetchUserBundles,
    {
      data: userBundlesData = { bundles: [] },
      isLoading: isUserBundlesLoading,
      isFetching: isUserBundlesFetching,
    },
  ] = useLazyFetchUserBundlesQuery();

  const [
    fetchUserBundlesStatuses,
    {
      data: userBundlesStatusesData = { bundles: [] },
      isLoading: isUserBundlesStatusesLoading,
      isFetching: isUserBundlesStatusesFetching,
    },
  ] = useLazyFetchUserBundlesStatusesQuery();

  useEffect(() => {
    fetchUserBundles({
      address,
      statuses: ['active'],
    });
    fetchUserBundlesStatuses({ address });
  }, [address, fetchUserBundles, fetchUserBundlesStatuses]);

  return {
    userActiveBundles: userBundlesData.bundles,
    userBundlesStatuses: userBundlesStatusesData.bundles,
    isUserBundlesLoading:
      isUserBundlesLoading ||
      isUserBundlesFetching ||
      isUserBundlesStatusesLoading ||
      isUserBundlesStatusesFetching,
  };
};
