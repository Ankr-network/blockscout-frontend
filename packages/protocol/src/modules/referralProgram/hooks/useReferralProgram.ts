import { useMemo } from 'react';

import { getReferralProgramBanner } from '../utils/getReferralProgramBanner';
import { getReferralProgramBlockchainName } from '../utils/getReferralProgramBlockchainName';
import { useReferralCode } from './useReferralCode';

export interface IUseReferralProgramProps {
  referralCode?: string;
}

export const useReferralProgram = ({
  referralCode: externalReferralCode,
}: IUseReferralProgramProps | void = {}) => {
  const { referralCode: referralCodeFromUrlOrStore } = useReferralCode();

  const referralCode = externalReferralCode || referralCodeFromUrlOrStore;

  const [blockchainName, banner] = useMemo(
    () => [
      getReferralProgramBlockchainName(referralCode),
      getReferralProgramBanner(referralCode),
    ],
    [referralCode],
  );

  return { banner, blockchainName, referralCode };
};
