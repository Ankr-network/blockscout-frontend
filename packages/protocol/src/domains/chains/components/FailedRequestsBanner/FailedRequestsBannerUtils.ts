import BigNumber from 'bignumber.js';
import { format } from 'date-fns';
import {
  IFailedRequestsBannerResponse,
  IFailedRequestsData,
} from 'domains/chains/utils/failedRequestsBannerUtils';

const list = [
  { count: 24000, dimensions: { statusCode: 400, ts: '2023-01-24' } },
  { count: 17400, dimensions: { statusCode: 400, ts: '2023-01-20' } },
  { count: 46500, dimensions: { statusCode: 400, ts: '2023-01-17' } },
  { count: 541900, dimensions: { statusCode: 200, ts: '2023-01-23' } },
  { count: 429800, dimensions: { statusCode: 200, ts: '2023-01-14' } },
  { count: 6855200, dimensions: { statusCode: 429, ts: '2023-02-10' } },
  { count: 921000, dimensions: { statusCode: 200, ts: '2023-02-12' } },
  {
    count: 548900,
    dimensions: { statusCode: 200, ts: '2023-01-22' },
  },
  {
    count: 489700,
    dimensions: { statusCode: 200, ts: '2023-01-15' },
  },
  { count: 15600, dimensions: { statusCode: 400, ts: '2023-01-25' } },
  {
    count: 1643100,
    dimensions: { statusCode: 200, ts: '2023-02-10' },
  },
  {
    count: 4827800,
    dimensions: { statusCode: 429, ts: '2023-01-14' },
  },
  {
    count: 3804900,
    dimensions: { statusCode: 429, ts: '2023-01-23' },
  },
  { count: 75500, dimensions: { statusCode: 400, ts: '2023-02-07' } },
  { count: 89100, dimensions: { statusCode: 400, ts: '2023-02-08' } },
  {
    count: 4508300,
    dimensions: { statusCode: 429, ts: '2023-01-15' },
  },
  {
    count: 4026400,
    dimensions: { statusCode: 429, ts: '2023-01-22' },
  },
  {
    count: 3444200,
    dimensions: { statusCode: 429, ts: '2023-02-12' },
  },
  {
    count: 394000,
    dimensions: { statusCode: 200, ts: '2023-01-24' },
  },
  {
    count: 4077300,
    dimensions: { statusCode: 429, ts: '2023-01-16' },
  },
  {
    count: 3649400,
    dimensions: { statusCode: 429, ts: '2023-01-24' },
  },
  {
    count: 3191300,
    dimensions: { statusCode: 429, ts: '2023-01-20' },
  },
  {
    count: 3443100,
    dimensions: { statusCode: 429, ts: '2023-01-17' },
  },
  {
    count: 1553800,
    dimensions: { statusCode: 200, ts: '2023-02-07' },
  },
  { count: 63100, dimensions: { statusCode: 400, ts: '2023-02-10' } },
  {
    count: 1245900,
    dimensions: { statusCode: 429, ts: '2023-01-25' },
  },
  { count: 11300, dimensions: { statusCode: 200, ts: '2023-02-03' } },
  {
    count: 2024800,
    dimensions: { statusCode: 200, ts: '2023-02-08' },
  },
  { count: 9000, dimensions: { statusCode: 400, ts: '2023-01-14' } },
  { count: 9700, dimensions: { statusCode: 400, ts: '2023-01-23' } },
  {
    count: 4866900,
    dimensions: { statusCode: 429, ts: '2023-02-07' },
  },
  {
    count: 511700,
    dimensions: { statusCode: 200, ts: '2023-01-17' },
  },
  {
    count: 415900,
    dimensions: { statusCode: 200, ts: '2023-01-20' },
  },
  {
    count: 5701400,
    dimensions: { statusCode: 429, ts: '2023-02-08' },
  },
  { count: 99800, dimensions: { statusCode: 429, ts: '2023-02-03' } },
  {
    count: 127000,
    dimensions: { statusCode: 200, ts: '2023-01-25' },
  },
  { count: 500, dimensions: { statusCode: 400, ts: '2023-01-15' } },
  { count: 17700, dimensions: { statusCode: 400, ts: '2023-01-22' } },
  { count: 44000, dimensions: { statusCode: 400, ts: '2023-02-12' } },
];

const data: IFailedRequestsData[] = [];

list
  .sort(
    (a, b) =>
      new Date(a.dimensions.ts).getTime() - new Date(b.dimensions.ts).getTime(),
  )
  .map(item => ({
    ...item,
    dimensions: {
      statusCode: item.dimensions.statusCode,
      ts: new Date(item.dimensions.ts).getTime(),
    },
  }))
  .forEach(item => {
    const newItem = data.find(i => i.timestamp === item.dimensions.ts);

    if (!newItem) {
      data.push({
        name: format(item.dimensions.ts, 'LLL d, yyyy'),
        timestamp: item.dimensions.ts,
        rejectedRequestsCount:
          item.dimensions.statusCode === 429 ? -item.count : 0,
        total: item.count,
      });
    } else {
      newItem.rejectedRequestsCount -=
        item.dimensions.statusCode === 429 ? item.count : 0;
      newItem.total += item.count;
    }
  });

const total = data.reduce((acc, item) => acc + item.total, 0).toString();

const rejectedRequestsCount = data
  .reduce((acc, item) => acc - item.rejectedRequestsCount, 0)
  .toString();

const rate = new BigNumber(rejectedRequestsCount)
  .dividedBy(new BigNumber(total))
  .times(100)
  .toFixed(0);

export const failedRequestsBannerData: IFailedRequestsBannerResponse = {
  total,
  rejectedRequestsCount,
  rate,
  list: data,
};
