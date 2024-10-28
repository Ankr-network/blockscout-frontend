import { RootState } from 'store';
import { isTeamInvitationPath } from 'domains/userSettings/utils/isTeamInvitationPath';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { selectCanContinueTeamCreationFlow } from 'modules/groups/store/selectors';
import { selectIsWeb3UserWithEmailBound } from 'domains/auth/store/selectors';
import { web3Api } from 'store/queries';

import { selectUserGroupConfigByAddress, setUserGroupConfig } from '../store';
import { userGroupFetchGroups } from './fetchGroups';

// TODO: move this logic to selectors: https://ankrnetwork.atlassian.net/browse/MRPC-4313
export const {
  endpoints: { shouldShowUserGroupDialog },
  useLazyShouldShowUserGroupDialogQuery,
  useShouldShowUserGroupDialogQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    shouldShowUserGroupDialog: build.query<boolean, void>({
      queryFn: async (_arg, { dispatch, getState }) => {
        const state = getState() as RootState;

        const isWeb3UserWithEmailBound = selectIsWeb3UserWithEmailBound(state);
        const { location } = state.router;

        if (isTeamInvitationPath(location.pathname)) {
          return { data: false };
        }

        if (isWeb3UserWithEmailBound) {
          return { data: false };
        }

        const {
          authAddress: userAddress,
          hasOauthLogin,
          hasWeb3Autoconnect,
          hasWeb3Connection,
        } = selectAuthData(state);

        const { selectedGroupAddress, shouldRemind } =
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
          userGroups?.find(({ address }) => address === selectedGroupAddress),
        );

        if (hasGroups && selectedGroupAddress && !isUserStillGroupMember) {
          // if user is not a member of the selected group any longer, we should reset the config
          if (userAddress) {
            dispatch(
              setUserGroupConfig({
                address: userAddress,
                selectedGroupAddress: userAddress,
                shouldRemind: true,
              }),
            );
          }

          return { data: false };
        }

        if (shouldRemind) {
          return { data: false };
        }

        const isUserHasGroupsAndNotSelectedGroupAddress =
          hasGroups && !selectedGroupAddress;

        const canContinueTeamCreationFlow =
          selectCanContinueTeamCreationFlow(state);

        const shouldContinueTeamCreationFlow =
          canContinueTeamCreationFlow &&
          isUserHasGroupsAndNotSelectedGroupAddress;

        const isUserHasOnlyPersonalAccount =
          userGroups && userGroups?.length === 1;

        const shouldSelectPersonalAccountIfNoGroups =
          isUserHasOnlyPersonalAccount && !selectedGroupAddress;

        const isAutoconnectButUserHasntSelectedGroup =
          hasWeb3Autoconnect && isUserHasGroupsAndNotSelectedGroupAddress;

        const shouldSelectPersonalAccount =
          (shouldContinueTeamCreationFlow ||
            shouldSelectPersonalAccountIfNoGroups ||
            isUserHasGroupsAndNotSelectedGroupAddress ||
            isAutoconnectButUserHasntSelectedGroup) &&
          userAddress;

        // in case if user is just logged in after team creation with data transfer
        // we should select personal account in order to get actual account status
        if (shouldSelectPersonalAccount) {
          dispatch(
            setUserGroupConfig({
              address: userAddress,
              selectedGroupAddress: selectedGroupAddress || userAddress,
              shouldRemind: true,
            }),
          );

          return {
            data: false,
          };
        }

        if (hasWeb3Autoconnect) {
          return { data: false };
        }

        return { data: false };
      },
    }),
  }),
});
