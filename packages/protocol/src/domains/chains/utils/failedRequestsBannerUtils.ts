import {
  FreeRegisteredUserRequest,
  FreeRegisteredUserRequests,
} from 'multirpc-sdk';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';
import { Timeframe } from '../types';
import { getCurrentTimestamp } from './timeframeUtils';

const FAILED_STATUS = '429';

export interface IFailedRequestsData {
  name: string;
  timestamp: number;
  total: number;
  rejectedRequestsCount: number;
}

export interface IFailedRequestsBannerResponse {
  total: string;
  rejectedRequestsCount: string;
  rate: string;
  list: IFailedRequestsData[];
}

const getChartLabelFormat = (timeframe: Timeframe) => {
  switch (timeframe) {
    case Timeframe.Day:
      return 'h:mmaaa, LLL dd';

    case Timeframe.Hour:
      return 'h:mmaaa';

    default:
      return 'LLL d, yyyy';
  }
};

const PERCENT = 100;

const getTotalRequests = (list: IFailedRequestsData[]) =>
  list.reduce(
    (acc, item) => new BigNumber(acc).plus(new BigNumber(item.total)),
    new BigNumber(0),
  );

const getRejectedRequests = (list: IFailedRequestsData[]) =>
  list.reduce(
    (acc, item) =>
      new BigNumber(acc).minus(new BigNumber(item.rejectedRequestsCount)),
    new BigNumber(0),
  );

const getPercentOfRejectedRequests = (
  total: BigNumber,
  rejectedRequestsCount: BigNumber,
) =>
  rejectedRequestsCount.isZero()
    ? '0'
    : rejectedRequestsCount.dividedBy(total).times(PERCENT).toFixed(0);

export const handleData = (
  result: FreeRegisteredUserRequests,
  timeframe: Timeframe,
) => {
  const record: Record<number, IFailedRequestsData> = {};

  Object.keys(result).forEach(timestamp => {
    const nextTimestamp = getCurrentTimestamp(Number(timestamp), timeframe);

    const item: FreeRegisteredUserRequest = result[timestamp];

    if (!(nextTimestamp in record)) {
      const info: IFailedRequestsData = {
        timestamp: Number(nextTimestamp),
        name: format(Number(nextTimestamp), getChartLabelFormat(timeframe)),
        total: 0,
        rejectedRequestsCount: 0,
      };
      record[nextTimestamp] = info;
    }

    Object.keys(item).forEach(status => {
      const amount = item[status];

      const recordItem = record[nextTimestamp];

      record[nextTimestamp] = {
        ...recordItem,
        total: new BigNumber(recordItem.total).plus(amount).toNumber(),
        rejectedRequestsCount: new BigNumber(recordItem.rejectedRequestsCount)
          .minus(status === FAILED_STATUS ? amount : 0)
          .toNumber(),
      };
    });
  });

  const list: IFailedRequestsData[] = Object.values(record);

  const totalRequests = getTotalRequests(list);

  const rejectedRequests = getRejectedRequests(list);

  return {
    total: totalRequests.toString(),
    rejectedRequestsCount: rejectedRequests.toString(),
    rate: getPercentOfRejectedRequests(totalRequests, rejectedRequests),
    list,
  };
};
