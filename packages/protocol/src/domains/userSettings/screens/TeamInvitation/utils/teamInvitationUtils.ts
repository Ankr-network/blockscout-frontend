export const AVOID_GUEST_TEAM_INVITATION_DIALOG =
  'shouldAvoidGuestTeamInvitationDialog';

export const shouldAvoidGuestTeamInvitationDialog = () => {
  return Boolean(localStorage.getItem(AVOID_GUEST_TEAM_INVITATION_DIALOG));
};

export const setAvoidGuestTeamInvitationDialog = () => {
  localStorage.setItem(AVOID_GUEST_TEAM_INVITATION_DIALOG, 'true');
};

export const removeAvoidGuestTeamInvitationDialog = () => {
  localStorage.removeItem(AVOID_GUEST_TEAM_INVITATION_DIALOG);
};
