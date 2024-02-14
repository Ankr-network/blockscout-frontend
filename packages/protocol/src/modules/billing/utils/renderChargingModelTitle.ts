import { t } from '@ankr.com/common';

import { EChargingModel } from '../types';

export const renderChargingModelTitle = (chargingModel: EChargingModel) => {
  switch (chargingModel) {
    case EChargingModel.PAYG:
      return t('account.charging-model.payg.title');
    case EChargingModel.Package:
      return t('account.charging-model.package.title');
    case EChargingModel.Deal:
      return t('account.charging-model.deal.title');
    case EChargingModel.Free:
    default:
      return t('account.charging-model.free.title');
  }
};
