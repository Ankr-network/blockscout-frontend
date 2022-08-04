import { Token } from 'modules/common/types/token';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IClickTradeEvent extends IBaseWaletData {
  stakeToken?: Token;
  stakedBalance?: string;
}

export const trackClickTrade = (properties: IClickTradeEvent): void => {
  trackAnalyticEvent({ event: AnalyticsEvents.ClickTrade, properties });
};
