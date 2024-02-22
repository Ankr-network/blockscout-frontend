import { EChargingModel, EPaymentType } from './types';

export const chargigModelTitlesMap: Record<EChargingModel, string> = {
  [EChargingModel.Deal]: 'account.charging-model.payg.title',
  [EChargingModel.Free]: 'account.charging-model.free.title',
  [EChargingModel.PAYG]: 'account.charging-model.payg.title',
  [EChargingModel.Package]: 'account.charging-model.package.title',
};

export const paymentTypeTitlesMap: Record<EPaymentType, string> = {
  [EPaymentType.Deal]: 'account.payment-types.deal.title',
  [EPaymentType.OneTime]: 'account.payment-types.one-time.title',
  [EPaymentType.Recurring]: 'account.payment-types.recurring.title',
};
