import { Locale } from 'modules/i18n';

export const ineligibleAccountDialogTranslation = {
  [Locale.en]: {
    branded: {
      description:
        'The Promo service plan is available for new users only and it seems that your account is already Premium. To activate your referral, sign in on the Web3 API platform with another account.',
      title: 'Promo plan: activation failed',
    },
    unbranded: {
      description:
        'The referral is available for new users only and it seems that your account is already Premium. To use your referral, sign in on the Web3 API platform with another account.',
      title: 'Referral failed: Freemium only',
    },
  },
};
