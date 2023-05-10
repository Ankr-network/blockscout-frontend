import {
  selectIsSelectedUserGroupPersonal,
  selectSelectedUserGroup,
  selectSelectedUserGroupIndex,
  selectUserGroupJwtBySelectedGroupAddress,
} from 'domains/userGroup/store';
import { useAppSelector } from 'store/useAppSelector';

export const useSelectedUserGroup = () => {
  const group = useAppSelector(selectSelectedUserGroup);
  const index = useAppSelector(selectSelectedUserGroupIndex);
  const isPersonal = useAppSelector(selectIsSelectedUserGroupPersonal);
  const selectedGroupAddress = isPersonal ? undefined : group?.groupAddress;
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
