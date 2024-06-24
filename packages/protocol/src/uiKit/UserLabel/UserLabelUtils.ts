import { t } from '@ankr.com/common';

import { EChargingModel } from 'modules/payments/types';

export const getLabel = (
  hasPremiumLabel: boolean,
  chargingModel?: EChargingModel,
): string => {
  if (chargingModel) {
    if (chargingModel === EChargingModel.Package) {
      return t('account.charging-model.package.title');
    }

    if (chargingModel === EChargingModel.Deal) {
      return t('account.charging-model.deal.title');
    }

    if (chargingModel === EChargingModel.PAYG) {
      return t('account.charging-model.payg.title');
    }
  }

  if (hasPremiumLabel) return t('chains.user-premium');

  return t('chains.user-free');
};
