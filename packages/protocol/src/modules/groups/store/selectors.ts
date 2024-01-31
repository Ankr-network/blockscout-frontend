import { createSelector } from '@reduxjs/toolkit';
import { GroupUserRole } from 'multirpc-sdk';

import { RootState } from 'store';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { selectIsLoggedIn } from 'domains/auth/store';

export const selectNewUserGroupResponse = (state: RootState) =>
  state.newUserGroup.createUserGroupResponse;

export const selectNewUserGroupOwner = createSelector(
  selectNewUserGroupResponse,
  createUserGroupResponse =>
    createUserGroupResponse?.group.members.find(
      member => member.role === GroupUserRole.owner,
    ),
);

export const selectShouldContinueTeamCreationFlow = (state: RootState) =>
  state.newUserGroup.shouldContinueTeamCreationFlow;

export const selectCanContinueTeamCreationFlow = createSelector(
  selectShouldContinueTeamCreationFlow,
  selectNewUserGroupOwner,
  selectAuthData,
  selectIsLoggedIn,
  (
    shouldContinueDataTransferFlow,
    newGroupOwner,
    { address = '', email = '' },
    isLoggedIn,
    // eslint-disable-next-line max-params
  ) => {
    const isCurrentUserOwnerOfNewTeam =
      newGroupOwner?.address.toLowerCase() === address.toLowerCase() ||
      newGroupOwner?.email.toLowerCase() === email.toLowerCase();

    const canContinueTeamCreationFlow =
      isLoggedIn &&
      shouldContinueDataTransferFlow &&
      isCurrentUserOwnerOfNewTeam;

    return canContinueTeamCreationFlow;
  },
);
