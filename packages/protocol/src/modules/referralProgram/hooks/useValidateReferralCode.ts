import { useCallback } from 'react';

import { isAlphanumeric } from 'modules/common/utils/isAlphanumeric';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { referralProgramTranslation } from '../translation';

export const useValidateReferralCode = () => {
  const { keys, t } = useTranslation(referralProgramTranslation);

  const validateReferralCode = useCallback(
    (referralCode: string | undefined) => {
      if (!referralCode) {
        return t(keys.noReferralCodeError);
      }

      if (!isAlphanumeric(referralCode)) {
        return t(keys.invalidReferralCodeError);
      }

      return undefined;
    },
    [keys, t],
  );

  return { validateReferralCode };
};
