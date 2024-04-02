import { EChargingModel, ECurrency, EPaymentType } from './types';

export const PRICES_PER_REQUEST_URL =
  'https://www.ankr.com/docs/rpc-service/pricing';

export const USD_TO_REQUESTS_RATE = 10_000_000;

export const DEFAULT_SELECTED_RECURRING_USD_AMOUNT = 50;

export const MIN_ANKR_AMOUNT = 1_000;
export const MIN_USD_AMOUNT = 10;

export const chargigModelTitlesMap: Record<EChargingModel, string> = {
  [EChargingModel.Deal]: 'account.charging-model.deal.title',
  [EChargingModel.Free]: 'account.charging-model.free.title',
  [EChargingModel.PAYG]: 'account.charging-model.payg.title',
  [EChargingModel.Package]: 'account.charging-model.package.title',
};

export const currencyLabelsMap: Record<ECurrency, string> = {
  [ECurrency.ANKR]: 'account.currencies.ankr',
  [ECurrency.USD]: 'account.currencies.usd',
};

type TPath = 'deal' | 'one-time' | 'recurring';

const getTitleKey = (path: TPath) =>
  `account.payment-types.${path}.payment-summary-title`;

const getDescriptionKey = (path: TPath) =>
  `account.payment-types.${path}.payment-summary-description`;

const getTooltipKey = (path: TPath) => `account.payment-types.${path}.tooltip`;

export const paymentTypeTitlesMap: Record<EPaymentType, string> = {
  [EPaymentType.Deal]: getTitleKey('deal'),
  [EPaymentType.OneTime]: getTitleKey('one-time'),
  [EPaymentType.Recurring]: getTitleKey('recurring'),
};

export const paymentTypeDescriptionsMap: Record<EPaymentType, string> = {
  [EPaymentType.Deal]: getDescriptionKey('deal'),
  [EPaymentType.OneTime]: getDescriptionKey('one-time'),
  [EPaymentType.Recurring]: getDescriptionKey('recurring'),
};

export const paymentTypeTooltipsMap: Record<EPaymentType, string> = {
  [EPaymentType.Deal]: getTooltipKey('deal'),
  [EPaymentType.OneTime]: getTooltipKey('one-time'),
  [EPaymentType.Recurring]: getTooltipKey('recurring'),
};
