import { Web3Address } from 'multirpc-sdk';
import { useFetchUserAddressesQuery } from 'modules/clients/actions/fetchUserAddresses';

export const useClientAddresses = ({ address }: { address: Web3Address }) => {
  const {
    data: userAddressesData,
    isLoading: isLoadingUserAddresses,
    isFetching: isFetchingUserAddresses,
    refetch: refetchUserAddressesData,
    isError: isErrorUserAddresses,
  } = useFetchUserAddressesQuery({ address });

  return {
    userAddressesData,
    isLoadingUserAddresses: isFetchingUserAddresses || isLoadingUserAddresses,
    refetchUserAddressesData,
    isErrorUserAddresses,
  };
};
