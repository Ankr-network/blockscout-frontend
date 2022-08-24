import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IUnstakeTokensEvent extends IBaseWaletData {
  unstakeAmount: string;
  availableUnstakeAmount: string;
  newStakedBalance: string;
  nodeProvider: string;
}

export const trackAnkrTokenUnstake = async (
  properties: IUnstakeTokensEvent,
): Promise<void> => {
  trackAnalyticEvent({ event: AnalyticsEvents.AnkrTokenUnstaking, properties });
};
