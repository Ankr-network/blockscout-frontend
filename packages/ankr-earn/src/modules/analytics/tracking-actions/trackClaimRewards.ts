import { Token } from 'modules/common/types/token';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IClickClaimRewardsEvent extends IBaseWaletData {
  tokenName?: Token;
  amount: string;
}

export const trackClaimRewards = (
  properties: IClickClaimRewardsEvent,
): void => {
  trackAnalyticEvent({
    event: AnalyticsEvents.ClickClaimRewards,
    properties,
  });
};
