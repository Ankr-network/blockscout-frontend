import commonBanner from 'modules/referralProgram/assets/common-banner.png';
import xaiBanner from 'modules/referralProgram/assets/xai-banner.png';

import { XAI_REFERRAL_CODE } from '../const';

type BannerUrl = string;
type ReferralCode = string;

const referralProgramBannersMap: Record<ReferralCode, BannerUrl> = {
  [XAI_REFERRAL_CODE]: xaiBanner,
};

export const getReferralProgramBanner = (
  referralCode: ReferralCode | undefined,
) => {
  if (referralCode) {
    return referralProgramBannersMap[referralCode] ?? commonBanner;
  }

  return commonBanner;
};
