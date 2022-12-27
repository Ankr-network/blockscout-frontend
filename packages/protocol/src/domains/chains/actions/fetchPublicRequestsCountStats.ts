import { Timeframe } from 'multirpc-sdk';

import { AppDispatch } from 'store';
import { ChainID } from 'modules/chains/types';
import { LEGACY_CHAINS, getMultiplier } from '../utils/statsUtils';
import { MultiService } from 'modules/api/MultiService';
import { calculateTotalRequests } from '../utils/calculateRPCAndLegacyStandaloneStats';
import { chainsFetchLegacyStandaloneRequests } from './fetchLegacyStandaloneRequests';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

// RTK Query will never run an endpoint if it has already run.
// Here we have few calls of the same endpoint but with different args,
// so we have to make sure we call each of them one by one.
const fetchLegacyStats = async (dispatch: AppDispatch) => {
  const legacyChains = Object.entries(LEGACY_CHAINS);
  const results = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [chainId, url] of legacyChains) {
    // eslint-disable-next-line no-await-in-loop
    const stats = await dispatch(
      chainsFetchLegacyStandaloneRequests.initiate({
        chainId: chainId as ChainID,
        url,
      }),
    );

    results.push(stats);
  }

  return results;
};

export const {
  endpoints: { chainsFetchPublicRequestsCountStats },
  useChainsFetchPublicRequestsCountStatsQuery,
  useLazyChainsFetchPublicRequestsCountStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPublicRequestsCountStats: build.query<
      Record<ChainID, string>,
      Timeframe
    >({
      queryFn: createNotifyingQueryFn(async (timeframe, { dispatch }) => {
        const totalRequestsData = (
          await MultiService.getService()
            .getPublicGateway()
            .getPublicTimeframesStats(timeframe)
        ).totalRequests;

        const results = await fetchLegacyStats(dispatch);

        const legacyStats = results.map(item => {
          return {
            chainId: item.data?.chainId,
            requests: item.data?.requests ?? 0,
          };
        });

        Object.keys(totalRequestsData).forEach(key => {
          if (key in LEGACY_CHAINS) {
            const legacyData = legacyStats.find(item => item.chainId === key);

            const totalRequests = calculateTotalRequests(
              getMultiplier(timeframe),
              Number(totalRequestsData[key]),
              Number(legacyData?.requests ?? 0),
            );

            totalRequestsData[key] = totalRequests.toString();
          }
        });

        return { data: totalRequestsData };
      }),
    }),
  }),
});
