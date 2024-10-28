import { Locale } from 'modules/i18n';

export const switchAccountDialogTranslation = {
  [Locale.en]: {
    branded: {
      description: `The Promo service plan is available for personal accounts only and it seems that you're using a Team account. To activate your referral, switch to your Personal account.`,
      title: 'Promo plan: activation failed',
    },
    unbranded: {
      description: `The referral is available for personal accounts only and it seems that you're using a Team account. To activate your referral, switch to your Personal account.`,
      title: 'Referral failed: Freemium only',
    },
  },
};
