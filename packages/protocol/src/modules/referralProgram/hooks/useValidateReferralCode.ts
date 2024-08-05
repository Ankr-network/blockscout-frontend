import { useCallback } from 'react';

import { isAlphanumeric } from 'modules/common/utils/isAlphanumeric';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { MAX_REFERRAL_CODE_LENGTH, MIN_REFERRAL_CODE_LENGTH } from '../const';
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

      if (referralCode.length < MIN_REFERRAL_CODE_LENGTH) {
        return t(keys.shortReferralCodeError);
      }

      if (referralCode.length > MAX_REFERRAL_CODE_LENGTH) {
        return t(keys.longReferralCodeError);
      }

      return undefined;
    },
    [keys, t],
  );

  return { validateReferralCode };
};
