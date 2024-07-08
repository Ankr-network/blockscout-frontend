import { useMemo } from 'react';

import { blockchainNamesMap, referralProgramBannersMap } from '../const';
import { useReferralCode } from './useReferralCode';

export const useReferralProgram = () => {
  const { referralCode } = useReferralCode();

  const [blockchainName, banner] = useMemo(() => {
    if (referralCode) {
      return [
        blockchainNamesMap[referralCode],
        referralProgramBannersMap[referralCode],
      ];
    }

    return [undefined, undefined];
  }, [referralCode]);

  return { banner, blockchainName, referralCode };
};
