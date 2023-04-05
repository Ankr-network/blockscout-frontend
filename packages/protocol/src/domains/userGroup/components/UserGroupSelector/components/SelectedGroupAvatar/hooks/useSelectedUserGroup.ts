import {
  selectIsSelectedUserGroupPersonal,
  selectSelectedUserGroup,
  selectSelectedUserGroupIndex,
} from 'domains/userGroup/store/userGroupSlice';
import { useAppSelector } from 'store/useAppSelector';

export const useSelectedUserGroup = () => {
  const group = useAppSelector(selectSelectedUserGroup);
  const index = useAppSelector(selectSelectedUserGroupIndex);
  const isPersonal = useAppSelector(selectIsSelectedUserGroupPersonal);

  return { group, index, isPersonal };
};
