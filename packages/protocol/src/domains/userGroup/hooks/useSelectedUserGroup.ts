import {
  selectSelectedUserGroup,
  selectSelectedUserGroupIndex,
  selectUserGroupJwtBySelectedGroupAddress,
  selectUserGroupLoading,
} from 'domains/userGroup/store';
import { useAppSelector } from 'store/useAppSelector';
import { selectAddress } from 'domains/auth/store';

import { useUserGroupConfig } from './useUserGroupConfig';

export const useSelectedUserGroup = () => {
  const { selectedGroupAddress: savedSelectedGroupAddress, selectedGroupRole } =
    useUserGroupConfig();

  const authAddress = useAppSelector(selectAddress);

  const group = useAppSelector(selectSelectedUserGroup);

  const index = useAppSelector(selectSelectedUserGroupIndex);

  const isPersonal = savedSelectedGroupAddress
    ? authAddress?.toLowerCase() === savedSelectedGroupAddress?.toLowerCase()
    : true;

  const selectedGroupAddress = isPersonal
    ? undefined
    : savedSelectedGroupAddress;

  const isGroupSelected = Boolean(selectedGroupAddress);

  const selectedGroupJwt = useAppSelector(
    selectUserGroupJwtBySelectedGroupAddress,
  );

  const isLoadingGroups = useAppSelector(selectUserGroupLoading);

  return {
    group,
    index,
    isGroupSelected,
    isLoadingGroups,
    isPersonal,
    selectedGroupAddress,
    selectedGroupJwt,
    selectedGroupRole,
  };
};
