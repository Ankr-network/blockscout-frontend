import { Locale } from 'modules/i18n';

export const amountInputTranslation = {
  [Locale.en]: {
    amountIsNotANumberError: 'Amount must be a number',
    amountIsRequiredError: 'Amount is required',
    amountTooBigError: `You've exceeded your bonus amount`,
    amountTooSmallError: 'Amount must be greater than 0',
    placeholder: 'Enter the amount',
    value: '{amount} API Credits',
  },
};
