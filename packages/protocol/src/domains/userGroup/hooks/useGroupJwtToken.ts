import { useEffect } from 'react';

import { useLazyUserGroupFetchGroupJwtQuery } from 'domains/userGroup/actions/fetchGroupJwt';

import { BlockWithPermission } from '../constants/groups';
import { useGuardUserGroup } from './useGuardUserGroup';
import { useSelectedUserGroup } from './useSelectedUserGroup';

let savedSelectedGroupAddress = '';

export const useGroupJwtToken = () => {
  const { selectedGroupJwt, selectedGroupAddress } = useSelectedUserGroup();

  const [fetchGroupJwt, { isLoading: isLoadingGroupToken }] =
    useLazyUserGroupFetchGroupJwtQuery();

  const hasAccess = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerRead,
  });

  useEffect(() => {
    if (
      selectedGroupAddress &&
      selectedGroupAddress !== savedSelectedGroupAddress &&
      hasAccess
    ) {
      savedSelectedGroupAddress = selectedGroupAddress;

      fetchGroupJwt({ group: selectedGroupAddress });
    }
  }, [hasAccess, selectedGroupAddress, fetchGroupJwt]);

  return {
    groupToken: selectedGroupJwt,
    isLoadingGroupToken,
  };
};
