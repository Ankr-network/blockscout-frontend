import { useEffect } from 'react';
import { Web3Address } from 'multirpc-sdk';

import { useLazyFetchUserAddressesQuery } from 'modules/clients/actions/fetchUserAddresses';

export const useClientAddresses = ({ address }: { address: Web3Address }) => {
  const [
    fetch,
    {
      data: userAddressesData,
      isLoading: isLoadingUserAddresses,
      isFetching: isFetchingUserAddresses,
      isError: isErrorUserAddresses,
    },
  ] = useLazyFetchUserAddressesQuery();

  useEffect(() => {
    fetch({ address });
  }, [address, fetch]);

  return {
    userAddressesData,
    isLoadingUserAddresses: isFetchingUserAddresses || isLoadingUserAddresses,
    isErrorUserAddresses,
  };
};
