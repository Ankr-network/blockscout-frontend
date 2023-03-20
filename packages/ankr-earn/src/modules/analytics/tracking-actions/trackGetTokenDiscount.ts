import { TToken } from 'modules/common/types/token';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IGetTokenDiscountEvent extends IBaseWaletData {
  stakeToken: TToken;
  synthToken: TToken;
}

export const trackGetTokenDiscount = (
  properties: IGetTokenDiscountEvent,
): void => {
  trackAnalyticEvent({ event: AnalyticsEvents.GetTokenDiscount, properties });
};
