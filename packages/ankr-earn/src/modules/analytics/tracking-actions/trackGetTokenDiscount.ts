import { TOpenOceanTokens } from 'modules/stake/api/getOpenOceanQuote';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IGetTokenDiscountEvent extends IBaseWaletData {
  stakeToken: TOpenOceanTokens;
  synthToken: TOpenOceanTokens;
}

export const trackGetTokenDiscount = (
  properties: IGetTokenDiscountEvent,
): void => {
  trackAnalyticEvent({ event: AnalyticsEvents.GetTokenDiscount, properties });
};
