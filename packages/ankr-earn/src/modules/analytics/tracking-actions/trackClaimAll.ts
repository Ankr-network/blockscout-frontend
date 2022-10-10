import { Token } from 'modules/common/types/token';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IClickClaimAllEvent extends IBaseWaletData {
  tokenName?: Token;
  amount: string;
}

export const trackClaimAll = (properties: IClickClaimAllEvent): void => {
  trackAnalyticEvent({
    event: AnalyticsEvents.ClickClaimAll,
    properties,
  });
};
