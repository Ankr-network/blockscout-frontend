import { Timestamp } from '@ankr.com/utils';
import BigNumber from 'bignumber.js';
import { isToday } from 'date-fns';
import { StatsByRangeResponse, WhitelistItem } from 'multirpc-sdk';

import { ProjectRequestsActivityProps } from '../ProjectRequestsActivity';

const MAX_BLOCKCHAIN_ICONS_NUMBER = 5;

export const formatBlockchainToString = (whitelist?: WhitelistItem[]) => {
  const blockchains = whitelist?.reduce(
    (acc, listItem) => acc.concat(listItem.blockchain),
    [''],
  );

  blockchains?.splice(0, 1);

  return blockchains?.slice(0, MAX_BLOCKCHAIN_ICONS_NUMBER);
};

interface ProjectActivityStats {
  timestamp: Timestamp;
  requests: number;
}

export const formatStatsByRangeToProjectActivityStats = (
  statsByRange: StatsByRangeResponse,
) => {
  const stats: ProjectActivityStats[] = [];

  Object.keys(statsByRange).forEach(key => {
    const timestamp = Number(key);

    stats.push({
      timestamp,
      requests: statsByRange[timestamp],
    });
  });

  return stats;
};

export const getTodaysRequests = (stats: ProjectActivityStats[]) =>
  stats
    .filter(item => isToday(item.timestamp))
    .reduce(
      (acc, item) => new BigNumber(acc).plus(item.requests),
      new BigNumber(0),
    );

const getYesterdaysRequests = (stats: ProjectActivityStats[]) =>
  stats
    .filter(item => !isToday(item.timestamp))
    .reduce(
      (acc, item) => new BigNumber(acc).plus(item.requests),
      new BigNumber(0),
    );

export const getProjectActivity = (
  stats: ProjectActivityStats[],
): ProjectRequestsActivityProps => {
  const activitiesToday = getTodaysRequests(stats);

  const activitiesYesterday = getYesterdaysRequests(stats);

  const isMoreRequestsTodayThanYesterday =
    activitiesToday.isGreaterThan(activitiesYesterday);

  const [dividend, divisor] = isMoreRequestsTodayThanYesterday
    ? [activitiesToday, activitiesYesterday]
    : [activitiesYesterday, activitiesToday];

  const percent = divisor.isZero()
    ? '100%'
    : `${dividend.dividedBy(divisor).toFormat(2)}%`;

  return {
    requestsCount: activitiesToday.toNumber(),
    isMoreRequestsTodayThanYesterday,
    percent: `${isMoreRequestsTodayThanYesterday ? '+' : '-'}${percent}`,
  };
};
