import xaiBanner from 'modules/referralProgram/assets/xai-banner.png';
import {
  XAI_BLOCKCHAIN_NAME,
  XAI_REFERRAL_CODE,
} from 'modules/referralProgram/const';

type ReferralCode = string;
type BannerUrl = string;

export const topBannersMap: Record<ReferralCode, BannerUrl> = {
  [XAI_REFERRAL_CODE]: xaiBanner,
};

export const blockchainNamesMap: Record<ReferralCode, string> = {
  [XAI_REFERRAL_CODE]: XAI_BLOCKCHAIN_NAME,
};
