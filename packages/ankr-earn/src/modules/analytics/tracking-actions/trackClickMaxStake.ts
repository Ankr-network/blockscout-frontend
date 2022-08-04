import { AnalyticsEvents } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IClickMaxStakeEvent {
  tokenName?: string;
  amountToken?: string;
}

export const trackClickMaxStake = (properties: IClickMaxStakeEvent): void => {
  trackAnalyticEvent({ event: AnalyticsEvents.ClickMaxStaking, properties });
};
