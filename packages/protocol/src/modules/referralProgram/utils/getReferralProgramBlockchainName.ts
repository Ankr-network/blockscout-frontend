import { XAI_BLOCKCHAIN_NAME, XAI_REFERRAL_CODE } from '../const';

type ReferralCode = string;

const blockchainNamesMap: Record<ReferralCode, string> = {
  [XAI_REFERRAL_CODE]: XAI_BLOCKCHAIN_NAME,
};

export const getReferralProgramBlockchainName = (
  referralCode: string | undefined,
) => {
  if (referralCode) {
    return blockchainNamesMap[referralCode];
  }

  return undefined;
};
