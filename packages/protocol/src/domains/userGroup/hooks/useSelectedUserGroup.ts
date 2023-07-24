import {
  selectSelectedUserGroup,
  selectSelectedUserGroupIndex,
  selectUserGroupJwtBySelectedGroupAddress,
} from 'domains/userGroup/store';
import { useAppSelector } from 'store/useAppSelector';
import { selectAuthData } from 'domains/auth/store/authSlice';

import { useUserGroupConfig } from './useUserGroupConfig';

export const useSelectedUserGroup = () => {
  const { selectedGroupAddress: savedSelectedGroupAddress } =
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

  return {
    group,
    index,
    isPersonal,
    selectedGroupAddress,
    isGroupSelected,
    selectedGroupJwt,
  };
};
