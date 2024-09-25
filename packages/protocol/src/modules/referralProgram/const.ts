import { IB2BReferralProgram } from './types';

export enum ApplyReferralCodeErrorCode {
  ALREADY_USED = 'already-used',
  EXPIRED = 'referral-code-expired',
  NOT_FOUND = 'not-found',
}

export const MIN_REFERRAL_CODE_LENGTH = 3;
export const MAX_REFERRAL_CODE_LENGTH = 32;

export const B2B_REFERRAL_PROGRAMS: IB2BReferralProgram[] = [
  // fill in this array to register a B2B referral program
];
