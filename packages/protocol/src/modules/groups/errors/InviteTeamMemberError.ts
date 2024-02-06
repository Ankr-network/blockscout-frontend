import { CustomError } from 'errors/CustomError';
import { CustomErrorCode } from 'errors/const';

type FailedEmails = string[];

export interface InviteTeamMemberError extends CustomError<FailedEmails> {
  code: CustomErrorCode.InviteTeamMemberError;
}
