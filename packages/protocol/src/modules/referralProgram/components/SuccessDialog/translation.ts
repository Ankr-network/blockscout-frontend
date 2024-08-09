import { Locale } from 'modules/i18n';

export const successDialogTranslation = {
  [Locale.en]: {
    branded: {
      description: `You've successfully activated the Promo service plan and can start interacting with <b>{blockchainName}</b> right away. Here is a summary of your Promo plan's details:`,
      doneButton: 'Done',
      title: '{blockchainName} Promo plan: activated',
    },
    unbranded: {
      description: `You've successfully activated the referral. You can claim a 20% bonus on the first deposit.`,
      doneButton: 'Done',
      title: 'Referral activated',
    },
  },
};
