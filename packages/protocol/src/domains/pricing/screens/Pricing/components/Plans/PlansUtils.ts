import { tHTML } from 'modules/i18n/utils/intl';

const root = 'plan.plans';

export const basicRoot = `${root}.basic-plan`;
export const basicFeatures = [
  tHTML(`${basicRoot}.features.requests`),
  tHTML(`${basicRoot}.features.login`),
  tHTML(`${basicRoot}.features.chains`),
];

export const premiumRoot = `${root}.premium-plan`;
export const premiumFeatures = [
  tHTML(`${premiumRoot}.features.websockets`),
  tHTML(`${premiumRoot}.features.api`),
  tHTML(`${premiumRoot}.features.requests`),
  tHTML(`${premiumRoot}.features.endpoints`),
];

export const premiumLink = tHTML(`${premiumRoot}.link`);
