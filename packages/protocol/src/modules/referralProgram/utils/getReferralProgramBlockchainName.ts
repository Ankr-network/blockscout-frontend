import { getReferralProgram } from './getReferralProgram';

export const getReferralProgramBlockchainName = (
  referralCode: string | undefined,
) => {
  const referralProgram = getReferralProgram(referralCode);

  return referralProgram?.blockchainName;
};
