import { Timeframe } from '../types';

export const IS_30D_PRIVATE_STATISTICS_DISABLED = true;

const { Hour, Day, Week, Month } = Timeframe;

export const publicTimeframes = [Day, Week, Month];
export const privateTimeframes = IS_30D_PRIVATE_STATISTICS_DISABLED
  ? [Hour, Day, Week]
  : [Hour, Day, Week, Month];
