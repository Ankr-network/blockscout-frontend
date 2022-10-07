import { Token } from 'modules/common/types/token';

import { AnalyticsEvents, IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IClickGoToDashboardEvent extends IBaseWaletData {
  tokenName?: Token;
}

export const trackClickGoToDashboard = (
  properties: IClickGoToDashboardEvent,
): void => {
  trackAnalyticEvent({
    event: AnalyticsEvents.СlickGoToDashboard,
    properties,
  });
};
