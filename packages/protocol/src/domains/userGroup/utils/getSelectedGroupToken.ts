import { RootState } from 'store';
import {
  selectIsSelectedUserGroupPersonal,
  selectUserGroupJwtBySelectedGroupAddress,
} from 'domains/userGroup/store/selectors';

export const getSelectedGroupJwt = (state: RootState) => {
  const isPersonalGroup = selectIsSelectedUserGroupPersonal(state);
  const groupJwt = selectUserGroupJwtBySelectedGroupAddress(state);

  if (isPersonalGroup) {
    return {};
  }

  return groupJwt;
};
