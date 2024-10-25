import encodeBanner from './assets/encode-banner.png';
import { IB2BReferralProgram } from './types';

export enum ApplyReferralCodeErrorCode {
  ALREADY_USED = 'already-used',
  EXPIRED = 'referral-code-expired',
  NOT_FOUND = 'not-found',
}

export const MIN_REFERRAL_CODE_LENGTH = 3;
export const MAX_REFERRAL_CODE_LENGTH = 32;

export const B2B_REFERRAL_PROGRAMS: IB2BReferralProgram[] = [
  {
    banner: encodeBanner,
    blockchainName: 'Encode Club Hachathone',
    bundleId: 'ede16278-ffa4-49a8-9ae8-9645b592b2e1',
    referralCode: 'Encode2024',
  },
];
