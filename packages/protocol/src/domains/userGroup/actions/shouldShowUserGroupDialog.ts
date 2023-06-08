import { web3Api } from 'store/queries';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { RootState } from 'store';
import { userGroupFetchGroups } from './fetchGroups';
import { selectIsWeb3UserWithEmailBound } from 'domains/auth/store/selectors';
import {
  resetUserGroupConfig,
  selectUserGroupConfigByAddress,
  resetUserGroupJwt,
} from '../store';

// TODO change this action to hook. Resolve the problem, when store(localstorage) is faster then data in actions
export const {
  endpoints: { shouldShowUserGroupDialog },
  useShouldShowUserGroupDialogQuery,
  useLazyShouldShowUserGroupDialogQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    shouldShowUserGroupDialog: build.query<boolean, void>({
      queryFn: async (_arg, { dispatch, getState }) => {
        const state = getState() as RootState;

        const isWeb3UserWithEmailBound = selectIsWeb3UserWithEmailBound(state);

        if (isWeb3UserWithEmailBound) {
          return { data: false };
        }

        const {
          hasWeb3Autoconnect,
          address: userAddress,
          hasWeb3Connection,
          hasOauthLogin,
        } = selectAuthData(state);
        const { shouldRemind, selectedGroupAddress } =
          selectUserGroupConfigByAddress(state);

        if (!hasOauthLogin && !hasWeb3Connection) {
          return { data: false };
        }

        const { data: cachedUserGroups } = userGroupFetchGroups.select()(state);

        let userGroups;

        if (!cachedUserGroups) {
          const { data } = await dispatch(userGroupFetchGroups.initiate());
          userGroups = data;
        } else {
          userGroups = cachedUserGroups;
        }

        const hasGroups = Boolean(userGroups && userGroups?.length > 1);

        const isUserStillGroupMember = Boolean(
          userGroups?.find(
            ({ groupAddress }) => groupAddress === selectedGroupAddress,
          ),
        );

        if (hasGroups && selectedGroupAddress && !isUserStillGroupMember) {
          // if user is not a member of the selected group any longer, we should reset the config
          dispatch(resetUserGroupConfig(userAddress));
          dispatch(resetUserGroupJwt(userAddress));

          return { data: true };
        }

        if (shouldRemind) {
          return { data: false };
        }

        const isUserHasGroupsAndNotSelectedGroupAddress =
          hasGroups && !selectedGroupAddress;

        const isAutoconnectButUserHasntSelectedGroup =
          hasWeb3Autoconnect && isUserHasGroupsAndNotSelectedGroupAddress;

        if (isAutoconnectButUserHasntSelectedGroup) {
          return { data: true };
        }

        if (hasWeb3Autoconnect) {
          return { data: false };
        }

        return { data: isUserHasGroupsAndNotSelectedGroupAddress };
      },
    }),
  }),
});
