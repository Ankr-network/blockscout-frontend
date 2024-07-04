import { XAI_REFERRAL_CODE } from '../const';

export const isXaiReferralCode = (code: string | undefined): code is string =>
  code === XAI_REFERRAL_CODE;
