import { Timeframe } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';
import { PrivateStatsInterval } from 'multirpc-sdk';

export const POLL_INTERVAL = 20;

const { Hour, Day, Week, Month } = Timeframe;

const root = 'chains.timeframes';
export const timeframeToLabelMap: Record<Timeframe, string> = {
  [Hour]: t(`${root}.hour`),
  [Day]: t(`${root}.day`),
  [Week]: t(`${root}.week`),
  [Month]: t(`${root}.month`),
};

type Map = Record<Timeframe, PrivateStatsInterval>;
export const timeframeToIntervalMap: Map = {
  [Hour]: PrivateStatsInterval.HOUR,
  [Day]: PrivateStatsInterval.DAY,
  [Week]: PrivateStatsInterval.WEEK,
  [Month]: PrivateStatsInterval.MONTH,
};
