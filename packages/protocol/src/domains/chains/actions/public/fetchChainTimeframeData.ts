import BigNumber from 'bignumber.js';
import { IWorkerGlobalStatus, Timeframe } from 'multirpc-sdk';

import { ChainID } from 'domains/chains/types';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { isReactSnap } from 'modules/common/utils/isReactSnap';

import { calculateRPCAndStandaloneStats } from '../../utils/calculateRPCAndStandaloneStats';
import { chainsFetchStandaloneRequests } from './fetchStandaloneRequests';
import { getStandaloneUrl } from '../../utils/statsUtils';

interface IFetchChainDetailsResponseData
  extends Omit<
    IWorkerGlobalStatus,
    | 'dataCached'
    | 'totalCached'
    | 'totalServed'
    | 'uniqueVisitors'
    | 'totalRequests'
  > {
  dataCached: BigNumber;
  totalCached: BigNumber;
  totalServed: BigNumber;
  uniqueVisitors: BigNumber;
  totalRequests: BigNumber;
}

interface RequestsCountry {
  country: string;
  bytes?: number;
  requests: number;
}

export type CountryMap = Record<string, RequestsCountry>;

export interface IApiChainDetails {
  dataCached: BigNumber;
  totalCached: BigNumber;
  totalServed: BigNumber;
  uniqueVisitors: BigNumber;

  uniqueVisitorsHistory: Record<string, number>;
  totalRequests: BigNumber;
  totalRequestsHistory: Record<string, number>;
  totalCachedHistory: Record<string, number>;
  totalServedHistory: Record<string, number>;
  dataCachedHistory: Record<string, number>;
  countries: CountryMap;
}

interface IWorkerGlobalStatusWithContent extends IWorkerGlobalStatus {
  __content: string;
}

const isIWorkerGlobalStatusWithContent = (
  value: IWorkerGlobalStatus,
): value is IWorkerGlobalStatusWithContent => '__content' in value;

const parseJSON = <Expected>(string: string): Expected => {
  try {
    return JSON.parse(string);
  } catch {
    return {} as Expected;
  }
};

const processData = (data: IWorkerGlobalStatus): IWorkerGlobalStatus => {
  if (isIWorkerGlobalStatusWithContent(data) && data.__content) {
    return parseJSON<IWorkerGlobalStatus>(data.__content);
  }

  return data;
};

const getData = (
  rawData: IWorkerGlobalStatus,
): IFetchChainDetailsResponseData => {
  const data = processData(rawData);

  const {
    dataCached,
    totalCached,
    totalServed,
    uniqueVisitors,
    totalRequests,
    ...other
  } = data;

  return {
    dataCached: new BigNumber(dataCached),
    totalCached: new BigNumber(totalCached),
    totalServed: new BigNumber(totalServed),
    uniqueVisitors: new BigNumber(uniqueVisitors),
    totalRequests: new BigNumber(totalRequests),
    ...other,
  };
};

export const {
  useLazyChainsFetchChainTimeframeDataQuery,
  endpoints: { chainsFetchChainTimeframeData },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchChainTimeframeData: build.query<
      IFetchChainDetailsResponseData,
      { chainId: string; timeframe: Timeframe }
    >({
      queryFn: createNotifyingQueryFn(
        async ({ chainId, timeframe }, { dispatch }) => {
          const rpcStats = await MultiService.getService()
            .getPublicGateway()
            .getTimeframeStats(chainId, timeframe);

          if (isReactSnap) {
            return { data: getData(rpcStats) };
          }

          const url = getStandaloneUrl(chainId);

          if (!url) return { data: getData(rpcStats) };

          const { data: standaloneStats } = await dispatch(
            chainsFetchStandaloneRequests.initiate({
              chainId: chainId as ChainID,
              url: url + timeframe,
            }),
          );

          if (!standaloneStats?.data) return { data: getData(rpcStats) };

          const stats = calculateRPCAndStandaloneStats(
            rpcStats,
            standaloneStats.data,
          );

          return { data: getData(stats) };
        },
      ),
    }),
  }),
});
