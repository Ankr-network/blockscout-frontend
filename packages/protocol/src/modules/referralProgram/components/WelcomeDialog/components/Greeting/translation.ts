import { Locale } from 'modules/i18n';

const brandedLoggedIn = {
  description: `You've come to Ankr's Web3 API platform through an {blockchainName} referral. This makes you eligible to use our promo service plan featuring the following perks:`,
  invitationToSignIn: 'Activate to start.',
  title: `Welcome to Ankr's referral program`,
};

const unbrandedLoggedIn = {
  description: `You've come to Ankr's Web3 API platform through a referral. This makes you eligible for a 20% increase on your first deposit if you choose to go Premium with us.`,
  invitationToSignIn: 'Activate to be able to redeem your bonus.',
  title: 'Referral activation',
};

export const greetingTranslation = {
  [Locale.en]: {
    brandedLoggedIn,
    brandedLoggedOut: {
      description: brandedLoggedIn.description,
      invitationToSignIn: 'Sign in to activate.',
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
