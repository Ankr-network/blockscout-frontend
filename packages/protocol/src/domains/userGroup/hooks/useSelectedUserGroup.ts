import {
  selectSelectedUserGroup,
  selectSelectedUserGroupIndex,
  selectUserGroupJwtBySelectedGroupAddress,
  selectUserGroupLoading,
} from 'domains/userGroup/store';
import { useAppSelector } from 'store/useAppSelector';
import { selectAuthData } from 'domains/auth/store/authSlice';

import { useUserGroupConfig } from './useUserGroupConfig';

export const useSelectedUserGroup = () => {
  const { selectedGroupAddress: savedSelectedGroupAddress, selectedGroupRole } =
    useUserGroupConfig();

  const authData = useAppSelector(selectAuthData);

  const group = useAppSelector(selectSelectedUserGroup);

  const index = useAppSelector(selectSelectedUserGroupIndex);

  const isPersonal = savedSelectedGroupAddress
    ? authData?.address?.toLowerCase() ===
      savedSelectedGroupAddress?.toLowerCase()
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
