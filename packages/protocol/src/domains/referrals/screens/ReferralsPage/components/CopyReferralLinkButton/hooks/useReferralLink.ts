import { useReferralCodes } from 'modules/referralProgram/hooks/useReferralCodes';
import { useReferralLinks } from 'modules/referralProgram/hooks/useReferralLinks';

export const useReferralLink = () => {
  const { referralCodes } = useReferralCodes({ skipFetching: true });
  const code = referralCodes[0];

  const { referralLinks } = useReferralLinks({
    codes: [code],
    skipFetching: true,
  });

  const link = referralLinks[code];

  return { link };
};
