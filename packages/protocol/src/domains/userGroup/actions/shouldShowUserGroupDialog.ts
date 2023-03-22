import { web3Api } from 'store/queries';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { RootState } from 'store';
import { userGroupFetchGroups } from './fetchGroups';
import { selectUserGroupConfigByAddress } from '../store/userGroupSlice';

export const {
  endpoints: { shouldShowUserGroupDialog },
  useShouldShowUserGroupDialogQuery,
  useLazyShouldShowUserGroupDialogQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    shouldShowUserGroupDialog: build.query<boolean, void>({
      queryFn: async (_arg, { dispatch, getState }) => {
        const state = getState() as RootState;

        const { hasWeb3Autoconnect } = selectAuthData(state);
        const { shouldRemind, selectedGroupAddress } =
          selectUserGroupConfigByAddress(state);

        if (shouldRemind) {
          return { data: false };
        }

        const { data: userGroups } = await dispatch(
          userGroupFetchGroups.initiate(),
        );
        const hasGroups = Boolean(userGroups && userGroups?.length > 1);

        const isAutoconnectButUserHasntSelectedGroup =
          hasWeb3Autoconnect && hasGroups && !selectedGroupAddress;

        if (isAutoconnectButUserHasntSelectedGroup) {
          return { data: true };
        }

        if (hasWeb3Autoconnect) {
          return { data: false };
        }

        return { data: hasGroups };
      },
    }),
  }),
});
