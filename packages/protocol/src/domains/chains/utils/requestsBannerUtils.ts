import { UserRequest, UserRequestsResponse } from 'multirpc-sdk';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';
import { Timeframe } from '@ankr.com/chains-list';

import { getCurrentTimestamp } from './timeframeUtils';

const SUCCESS_STATUS_CODE_FIRST_SYMBOL = '2';

export interface IRequestsData {
  name: string;
  timestamp: number;
  total: number;
  rejectedRequestsCount: number;
  successRequestsCount: number;
}

export interface IRequestsBannerResponse {
  total: string;
  rejectedRequestsCount: string;
  successRequestsCount: string;
  rate: string;
  list: IRequestsData[];
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

const getTotalRequests = (list: IRequestsData[]) =>
  list.reduce(
    (acc, item) => new BigNumber(acc).plus(new BigNumber(item.total)),
    new BigNumber(0),
  );

const getSuccessRequests = (list: IRequestsData[]) =>
  list.reduce(
    (acc, item) =>
      new BigNumber(acc).plus(new BigNumber(item.successRequestsCount)),
    new BigNumber(0),
  );

const getRejectedRequests = (list: IRequestsData[]) =>
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
  result: UserRequestsResponse,
  timeframe: Timeframe,
) => {
  const record: Record<number, IRequestsData> = {};

  Object.keys(result).forEach(timestamp => {
    const nextTimestamp = getCurrentTimestamp(Number(timestamp), timeframe);

    const item: UserRequest = result[timestamp];

    if (!(nextTimestamp in record)) {
      const info: IRequestsData = {
        timestamp: Number(nextTimestamp),
        name: format(Number(nextTimestamp), getChartLabelFormat(timeframe)),
        total: 0,
        successRequestsCount: 0,
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
        successRequestsCount: new BigNumber(recordItem.successRequestsCount)
          .plus(
            status.startsWith(SUCCESS_STATUS_CODE_FIRST_SYMBOL) ? amount : 0,
          )
          .toNumber(),
        rejectedRequestsCount: new BigNumber(recordItem.rejectedRequestsCount)
          .minus(
            !status.startsWith(SUCCESS_STATUS_CODE_FIRST_SYMBOL) ? amount : 0,
          )
          .toNumber(),
      };
    });
  });

  const list: IRequestsData[] = Object.values(record);

  const totalRequests = getTotalRequests(list);

  const rejectedRequests = getRejectedRequests(list);

  const successRequests = getSuccessRequests(list);

  return {
    total: totalRequests.toString(),
    rejectedRequestsCount: rejectedRequests.toString(),
    successRequestsCount: successRequests.toString(),
    rate: getPercentOfRejectedRequests(totalRequests, rejectedRequests),
    list,
  };
};
