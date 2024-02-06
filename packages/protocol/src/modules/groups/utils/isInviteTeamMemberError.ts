import { CustomErrorCode } from 'errors/const';

import { isCustomError } from 'store/utils/isCustomError';

import { InviteTeamMemberError } from '../errors/InviteTeamMemberError';

export const isInviteTeamMemberError = (
  error: unknown,
): error is InviteTeamMemberError =>
  isCustomError(error) && error.code === CustomErrorCode.InviteTeamMemberError;
