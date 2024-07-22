import { useMemo } from 'react';

import { getReferralProgramBanner } from '../utils/getReferralProgramBanner';
import { getReferralProgramBlockchainName } from '../utils/getReferralProgramBlockchainName';
import { useReferralCode } from './useReferralCode';

export const useReferralProgram = () => {
  const { referralCode } = useReferralCode();

  const [blockchainName, banner] = useMemo(
    () => [
      getReferralProgramBlockchainName(referralCode),
      getReferralProgramBanner(referralCode),
    ],
    [referralCode],
  );

  return { banner, blockchainName, referralCode };
};
