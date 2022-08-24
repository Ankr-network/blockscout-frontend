import { AnalyticsEvents } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

export const trackEnterAnkrTokenManage = (): void => {
  trackAnalyticEvent({ event: AnalyticsEvents.EnterAnkrTokenManage });
};
