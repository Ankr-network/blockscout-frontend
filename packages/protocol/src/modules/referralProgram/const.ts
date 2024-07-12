import xaiBanner from 'modules/referralProgram/assets/xai-banner.png';

export enum ApplyReferralCodeErrorCode {
  ALREADY_USED = 'already-used',
  EXPIRED = 'referral-code-expired',
  NOT_FOUND = 'not-found',
}

export const XAI_BLOCKCHAIN_NAME = 'Xai';
export const XAI_REFERRAL_CODE = '5MhwK32c55';

type BannerUrl = string;
type ReferralCode = string;

export const blockchainNamesMap: Record<ReferralCode, string> = {
  [XAI_REFERRAL_CODE]: XAI_BLOCKCHAIN_NAME,
};

export const referralProgramBannersMap: Record<ReferralCode, BannerUrl> = {
  [XAI_REFERRAL_CODE]: xaiBanner,
};
