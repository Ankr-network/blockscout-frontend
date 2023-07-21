import { useEffect } from 'react';

import { useLazyUserGroupFetchGroupJwtQuery } from 'domains/userGroup/actions/fetchGroupJwt';

import { useSelectedUserGroup } from './useSelectedUserGroup';

let savedSelectedGroupAddress = '';

export const useGroupJwtToken = () => {
  const { selectedGroupJwt, selectedGroupAddress } = useSelectedUserGroup();

  const [fetchGroupJwt, { isLoading: isLoadingGroupToken }] =
    useLazyUserGroupFetchGroupJwtQuery();

  useEffect(() => {
    if (
      selectedGroupAddress &&
      selectedGroupAddress !== savedSelectedGroupAddress
    ) {
      savedSelectedGroupAddress = selectedGroupAddress;

      fetchGroupJwt({ group: selectedGroupAddress });
    }
  }, [selectedGroupAddress, fetchGroupJwt]);

  return {
    groupToken: selectedGroupJwt,
    isLoadingGroupToken,
  };
};
