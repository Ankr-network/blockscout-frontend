import { Token } from 'modules/common/types/token';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IClickClaimAllRewardsEvent extends IBaseWaletData {
  tokenName?: Token;
  amount: string;
}

export const trackClaimAllRewards = (
  properties: IClickClaimAllRewardsEvent,
): void => {
  trackAnalyticEvent({
    event: AnalyticsEvents.ClickClaimAllRewards,
    properties,
  });
};
