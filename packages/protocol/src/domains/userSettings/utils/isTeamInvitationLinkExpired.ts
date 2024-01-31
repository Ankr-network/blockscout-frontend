import { Seconds } from '@ankr.com/utils';

export const isTeamInvitationLinkExpired = (expiresAtSec: Seconds) => {
  const expiresAtMs = expiresAtSec * 1_000;
  const nowMs = new Date().getTime();

  return nowMs > expiresAtMs;
};
