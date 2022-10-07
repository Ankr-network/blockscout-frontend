import { Token } from 'modules/common/types/token';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IDelegatedStakingEvent extends IBaseWaletData {
  token: Token;
  stakeAmount: string;
  nodeProvider: string;
  addingStake: boolean;
  newStakedBalance: string;
}

export const trackDelegatedStaking = (
  properties: IDelegatedStakingEvent,
): void => {
  trackAnalyticEvent({
    event: AnalyticsEvents.ClickClaimRewards,
    properties,
  });
};
