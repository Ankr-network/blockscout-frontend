import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IStakeTokensEvent extends IBaseWaletData {
  stakeAmount: string;
  nodeProvider: string;
  addingStake: boolean;
  newStakedBalance: string;
}

export const trackAnkrTokenStake = async (
  properties: IStakeTokensEvent,
): Promise<void> => {
  trackAnalyticEvent({ event: AnalyticsEvents.AnkrTokenStake, properties });
};
