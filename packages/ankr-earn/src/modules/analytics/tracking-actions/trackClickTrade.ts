import { Token } from 'modules/common/types/token';

import { IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IClickTradeEvent extends IBaseWaletData {
  stakeToken?: Token;
  stakedBalance?: string;
}

export const trackClickTrade = (properties: IClickTradeEvent): void => {
  trackAnalyticEvent({ event: 'click_trade', properties });
};
