import { EChargingModel } from './types';

export const DEFAULT_SELECTED_RECURRING_USD_AMOUNT = 50;

export const chargigModelTitlesMap: Record<EChargingModel, string> = {
  [EChargingModel.Deal]: 'account.charging-model.deal.title',
  [EChargingModel.Free]: 'account.charging-model.free.title',
  [EChargingModel.PAYG]: 'account.charging-model.payg.title',
  [EChargingModel.Package]: 'account.charging-model.package.title',
};
