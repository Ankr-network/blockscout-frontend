import BigNumber from 'bignumber.js';
import { IWorkerGlobalStatus, Timeframe } from 'multirpc-sdk';

import { ChainID } from 'modules/chains/types';
import { MultiService } from 'modules/api/MultiService';
import { calculateRPCAndLegacyStandaloneStats } from '../utils/calculateRPCAndLegacyStandaloneStats';
import { chainsFetchLegacyStandaloneRequests } from './fetchLegacyStandaloneRequests';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getLegacyStandaloneUrl } from '../utils/statsUtils';
import { web3Api } from 'store/queries';

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

          const url = getLegacyStandaloneUrl(chainId);

          if (!url) return { data: getData(rpcStats) };

          const { data: legacyStats } = await dispatch(
            chainsFetchLegacyStandaloneRequests.initiate({
              chainId: chainId as ChainID,
              url,
            }),
          );

          const stats = calculateRPCAndLegacyStandaloneStats(
            timeframe,
            rpcStats,
            legacyStats,
          );

          return { data: getData(stats) };
        },
      ),
    }),
  }),
});
