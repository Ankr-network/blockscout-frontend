import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IClickDefiAggregatorEvent extends IBaseWaletData {
  assets: string;
  network: string;
  protocol: string;
  type: string;
  rewards: string;
}

export const trackClickDefiAggregator = (
  properties: IClickDefiAggregatorEvent,
): void => {
  trackAnalyticEvent({
    event: AnalyticsEvents.ClickDefiAggregator,
    properties,
  });
};
