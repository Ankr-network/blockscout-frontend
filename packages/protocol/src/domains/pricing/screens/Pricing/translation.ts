import { Locale } from 'modules/i18n';

export const pricingTranslation = {
  [Locale.en]: {
    breadcrumbs: 'Pricing',
    title: 'Pricing.',
    scalePlan: {
      title: 'Pay just for the requests you make.',
      payAsYouGo: 'PAY-AS-YOU-GO',
      description: 'A usage-based model for Premium and Enterprise services.',
      item1: 'No-commitment model',
      item2: 'Cost-efficient services',
      item3: 'Right-sized resources',
      item4: 'Highly-scalable solution',
      header1: 'API Type',
      header2: 'Credits for 1000 req',
      header3: 'USD for 1000 req',
      row1Column1: 'ETH & EVM compatible',
      row1Column2: '200,000',
      row1Column3: '$0.02',
      row2Column1: 'Solana',
      row2Column2: '500,000',
      row2Column3: '$0.05',
      row3Column1: 'Advanced API',
      row3Column2: '700,000',
      row3Column3: '$0.07',
    },
    premiumBlock: {
      min: 'Should be at least {value} ANKR',
      balance: 'Your balance is not sufficient',
    },
    emailContent:
      'For account setup, Ankr needs an&nbsp;email for important notifications and service updates. Don&rsquo;t worry, your info is&nbsp;highly secured and never shared&nbsp;&mdash; use an&nbsp;anonymous address if&nbsp;you wish!',
  },
};
