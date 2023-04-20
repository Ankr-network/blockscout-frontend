import { GetState } from 'store';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store/selectors';
import { selectAuthData } from 'domains/auth/store/authSlice';

export const getSelectedGroupAddress = (getState: GetState) => {
  const state = getState();
  const { address } = selectAuthData(state);
  const { selectedGroupAddress, selectedGroupRole } =
    selectUserGroupConfigByAddress(state);

  // if selectedGroupAddress is equal address
  // user is using account as personal,
  // and we don't need to use group requests.
  if (address === selectedGroupAddress) {
    return { selectedGroupAddress: undefined, selectedGroupRole: undefined };
  }

  return { selectedGroupAddress, selectedGroupRole };
};
