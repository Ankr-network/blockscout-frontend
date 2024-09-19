import { Timeframe } from 'multirpc-sdk';
import BigNumber from 'bignumber.js';
import { ChainID } from '@ankr.com/chains-list';

import { AppDispatch } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

import { chainsFetchStandaloneRequests } from './fetchStandaloneRequests';
import { STANDALONE_CHAINS } from '../../utils/statsUtils';

// RTK Query will never run an endpoint if it has already run.
// Here we have few calls of the same endpoint but with different args,
// so we have to make sure we call each of them one by one.
const fetchStandaloneStats = async (
  dispatch: AppDispatch,
  timeframe: Timeframe,
) => {
  const standaloneChains = Object.entries(STANDALONE_CHAINS);
  const results = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [chainId, url] of standaloneChains) {
    // eslint-disable-next-line no-await-in-loop
    const stats = await dispatch(
      chainsFetchStandaloneRequests.initiate({
        chainId: chainId as ChainID,
        url: url + timeframe,
      }),
    );

    results.push(stats);
  }

  return results;
};

export const { useChainsFetchPublicRequestsCountStatsQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      chainsFetchPublicRequestsCountStats: build.query<
        Record<ChainID, string>,
        Timeframe
      >({
        queryFn: createQueryFnWithErrorHandler({
          queryFn: async (timeframe, { dispatch }) => {
            if (isReactSnap) {
              return { data: {} };
            }

            const totalRequestsData = (
              await MultiService.getService()
                .getPublicGateway()
                .getPublicTimeframesStats(timeframe)
            ).totalRequests;

            const results = await fetchStandaloneStats(dispatch, timeframe);

            const standaloneStats = results.map(item => {
              return {
                chainId: item.data?.chainId,
                requests: item.data?.data?.totalRequests || 0,
              };
            });

            Object.keys(totalRequestsData).forEach(key => {
              if (key in STANDALONE_CHAINS) {
                const standaloneData = standaloneStats.find(
                  item => item.chainId === key,
                );

                const totalRequests = new BigNumber(totalRequestsData[key])
                  .plus(standaloneData?.requests || 0)
                  .toString();

                totalRequestsData[key] = totalRequests;
              }
            });

            return { data: totalRequestsData };
          },
          errorHandler: error => ({ error }),
        }),
      }),
    }),
  });
