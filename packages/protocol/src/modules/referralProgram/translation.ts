import { Locale } from 'modules/i18n';

import { MAX_REFERRAL_CODE_LENGTH, MIN_REFERRAL_CODE_LENGTH } from './const';

export const referralProgramTranslation = {
  [Locale.en]: {
    branded: {
      activationAcceptedMessage: `You've got 10B API Credits for a month of interaction with {blockchainName}.`,
      activationAcceptedTitle: '{blockchainName} Promo: activated',
      activationRejectedErrorTitle:
        '{blockchainName} Promo: activation rejected',
      activationRejectedErrorMessage:
        'No worries, you can activate it later via the same referral link.',
    },
    unbranded: {
      activationAcceptedMessage:
        'You can claim a 20% bonus on the first deposit.',
      activationAcceptedTitle: 'Referral activated',
      activationRejectedErrorTitle: 'Referral: activation rejected',
      activationRejectedErrorMessage:
        'No worries, you can activate it later via the same referral link.',
    },
    invalidReferralCodeError:
      'Use only case-sensitive alphanumeric characters (A-Z, a-z, 0-9)',
    noReferralCodeError: 'Referral code required',
    shortReferralCodeError: `Min length — ${MIN_REFERRAL_CODE_LENGTH} characters`,
    longReferralCodeError: `Max length — ${MAX_REFERRAL_CODE_LENGTH} characters`,
  },
};
