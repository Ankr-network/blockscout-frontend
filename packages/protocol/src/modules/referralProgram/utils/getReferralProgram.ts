import { B2B_REFERRAL_PROGRAMS } from '../const';

export const getReferralProgram = (referralCode: string | undefined) => {
  const referralProgram = B2B_REFERRAL_PROGRAMS.find(
    program => program.referralCode === referralCode,
  );

  return referralProgram;
};
