import { Locale } from 'modules/i18n';
import { AAPI_SUPPORTED_METHODS_LINK } from 'modules/common/constants/const';

export const pricingTranslation = {
  [Locale.en]: {
    header: {
      method: 'Method',
      apiCredits: 'API Credits/request',
      usd: 'USD/request',
    },
    method: {
      text: 'All supported methods',
      link: AAPI_SUPPORTED_METHODS_LINK,
    },
    apiCredits: '700',
    usd: '$0.00007',
  },
};
