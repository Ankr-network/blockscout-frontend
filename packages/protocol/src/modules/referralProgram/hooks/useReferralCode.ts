import { getReferralCodeFromUrl } from '../utils/getReferralCodeFromUrl';
import { useSavedReferralCode } from './useSavedReferralCode';

export const useReferralCode = () => {
  const { referralCode: referralCodeFromUrl } = getReferralCodeFromUrl();

  const { savedReferralCode } = useSavedReferralCode();

  return { referralCode: referralCodeFromUrl || savedReferralCode };
};
