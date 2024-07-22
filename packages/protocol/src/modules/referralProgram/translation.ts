import { Locale } from 'modules/i18n';

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
        'You can claim a 20% bonus on the first deposit within 30 days of activation.',
      activationAcceptedTitle: 'Referral activated',
      activationRejectedErrorTitle: 'Referral: activation rejected',
      activationRejectedErrorMessage:
        'No worries, you can activate it later via the same referral link.',
    },
  },
};
