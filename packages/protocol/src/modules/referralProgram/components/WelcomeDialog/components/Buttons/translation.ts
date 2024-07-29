import { Locale } from 'modules/i18n';

const branded = {
  activateButton: 'Activate Promo',
  cancelButton: 'Cancel',
  signInButton: 'Sign in',
};

export const buttonsTranslation = {
  [Locale.en]: {
    branded,
    unbranded: {
      ...branded,
      activateButton: 'Activate referral',
    },
  },
};
