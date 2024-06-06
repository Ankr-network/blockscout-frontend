import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { fetchGoogleLoginParams } from 'domains/oauth/actions/fetchGoogleLoginParams';
import { isTeamInvitationLinkExpired } from 'domains/userSettings/utils/isTeamInvitationLinkExpired';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { TeamInvitationContentType } from '../constants';

export const useTeamInvitationContentType = () => {
  const { email: authEmail, isLoggedIn } = useAuth();

  // Used to prevent dialogs blinking when logging out before logging in via
  // another email
  const [, { isLoading: shouldKeepEmailVerification }] = useQueryEndpoint(
    fetchGoogleLoginParams,
  );

  const { email, expires_at: expiresAtSec = '' } =
    UserSettingsRoutesConfig.teamInvitation.useQuery();

  const isWrongEmail = isLoggedIn && email !== authEmail;

  if (isTeamInvitationLinkExpired(Number(expiresAtSec))) {
    return TeamInvitationContentType.LinkExpired;
  }

  if (isWrongEmail || shouldKeepEmailVerification) {
    return TeamInvitationContentType.EmailVerification;
  }

  return TeamInvitationContentType.InvitationAcceptance;
};
