import { EOpenOceanTokens } from 'modules/stake/types';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IGetTokenDiscountEvent extends IBaseWaletData {
  stakeToken: EOpenOceanTokens;
  synthToken: EOpenOceanTokens;
}

export const trackGetTokenDiscount = (
  properties: IGetTokenDiscountEvent,
): void => {
  trackAnalyticEvent({ event: AnalyticsEvents.GetTokenDiscount, properties });
};
