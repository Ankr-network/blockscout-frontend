import { t } from '@ankr.com/common';

import { EChargingModel } from '../types';
import { chargigModelTitlesMap } from '../const';

export const renderChargingModelTitle = (chargingModel: EChargingModel) =>
  t(chargigModelTitlesMap[chargingModel]);
