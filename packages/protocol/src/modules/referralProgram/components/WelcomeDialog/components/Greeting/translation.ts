import { Locale } from 'modules/i18n';

const brandedLoggedIn = {
  description: `You've come to Ankr's Web3 API platform through a B2B referral. This makes you eligible to use our B2B-exclusive Promo service plan featuring the following perks:`,
  invitationToSignIn: 'Activate to start interacting with {blockchainName}.',
  title: `Welcome to Ankr's Promo plan`,
};

const unbrandedLoggedIn = {
  description: `You've come to Ankr's Web3 API platform through a referral. This makes you eligible for a 20% increase on your first deposit if you choose to go Premium with us.`,
  invitationToSignIn: '',
  title: 'Referral activation',
};

export const greetingTranslation = {
  [Locale.en]: {
    brandedLoggedIn,
    brandedLoggedOut: {
      description: brandedLoggedIn.description,
      invitationToSignIn: 'Sign in to start interacting with {blockchainName}.',
      title: brandedLoggedIn.title,
    },
    unbrandedLoggedIn,
    unbrandedLoggedOut: {
      description: unbrandedLoggedIn.description,
      invitationToSignIn:
        'Sign in to start testing premium features with Freemium.',
      title: 'Welcome to Web3 API platform',
    },
  },
};
