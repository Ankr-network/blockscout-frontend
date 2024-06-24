import { t } from '@ankr.com/common';

import { chargigModelTitlesMap } from 'modules/payments/const';
import { EChargingModel } from 'modules/payments/types';

export const renderChargingModelTitle = (chargingModel: EChargingModel) =>
  t(chargigModelTitlesMap[chargingModel]);
