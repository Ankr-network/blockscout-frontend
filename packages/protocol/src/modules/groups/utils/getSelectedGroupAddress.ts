import { RootState } from 'store';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store/selectors';

export const getSelectedGroupAddress = (state: RootState) => {
  const { authAddress } = selectAuthData(state);
  const { selectedGroupAddress, selectedGroupRole } =
    selectUserGroupConfigByAddress(state);

  // if selectedGroupAddress is equal auth address
  // user is using account as personal,
  // and we don't need to use group requests.
  if (authAddress === selectedGroupAddress) {
    return { selectedGroupAddress: undefined, selectedGroupRole: undefined };
  }

  return { selectedGroupAddress, selectedGroupRole };
};
