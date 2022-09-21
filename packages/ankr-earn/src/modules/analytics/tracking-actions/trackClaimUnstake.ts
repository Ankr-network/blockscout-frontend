import { Token } from 'modules/common/types/token';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IClickClaimUnstakeEvent extends IBaseWaletData {
  tokenName?: Token;
  amount: string;
}

export const trackClaimUnstake = (
  properties: IClickClaimUnstakeEvent,
): void => {
  trackAnalyticEvent({
    event: AnalyticsEvents.ClickClaimUnstake,
    properties,
  });
};
