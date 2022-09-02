import { Token } from 'modules/common/types/token';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

export type TAccessPoint =
  | 'dashboard'
  | 'delegated_staking_stake'
  | 'delegated_staking_manage';

interface IEnterStakingFlowEvent extends IBaseWaletData {
  accessPoint: TAccessPoint;
  tokenName?: Token;
}

export const trackDelegatedStakingFlow = (
  properties: IEnterStakingFlowEvent,
): void => {
  trackAnalyticEvent({
    event: AnalyticsEvents.DelegatedStakingFlow,
    properties,
  });
};
