import commonBanner from 'modules/referralProgram/assets/common-banner.png';

import { getReferralProgram } from './getReferralProgram';

export const getReferralProgramBanner = (referralCode: string | undefined) => {
  const referralProgram = getReferralProgram(referralCode);

  return referralProgram?.banner ?? commonBanner;
};
