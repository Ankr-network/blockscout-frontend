import xaiBanner from 'modules/referralProgram/assets/xai-banner.png';

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
    banner: xaiBanner,
    blockchainName: 'Xai',
    bundleId: 'e2f9411b-ad39-4a7f-9095-cc55ca7cc8ec',
    referralCode: '5MhwK32c55',
  },
  {
    banner: xaiBanner,
    blockchainName: 'Expired',
    bundleId: 'e2f9411b-ad39-4a7f-9095-cc55ca7cc8ec',
    referralCode: '7MhwK32c77',
  },
];
