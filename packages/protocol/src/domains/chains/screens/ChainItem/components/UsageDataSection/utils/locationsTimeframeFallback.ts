import { Timeframe } from 'domains/chains/types';
import { SHOULD_SHOW_ONLY_PREMIUM_7D_COUNTRIES } from '../components/PrivateUsageDataSection/PrivateUsageDataSectionUtils';

/* Since request by ip only support 30d/7d by backend, so hard code it first. When backend support all the timeframe should be removed  */
export const locationsTimeframeFallback = (timeframe: Timeframe) => {
  if (SHOULD_SHOW_ONLY_PREMIUM_7D_COUNTRIES) {
    return Timeframe.Week;
  }

  return timeframe;
};
