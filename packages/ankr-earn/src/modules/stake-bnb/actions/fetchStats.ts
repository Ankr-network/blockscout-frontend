import BigNumber from 'bignumber.js';

import { BinanceSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';

import { CacheTags } from '../const';

interface IFetchStatsResponseData {
  aBNBbBalance: BigNumber;
  aBNBcBalance: BigNumber;
  bnbBalance: BigNumber;
  minStake: BigNumber;
  minAbnbbUnstake: BigNumber;
  minAbnbcUnstake: BigNumber;
  relayerFee: BigNumber;
  aBNBcRatio: BigNumber;
  aETHBalance: BigNumber;
  aETHRatio: BigNumber;
  poolBalance: BigNumber;
  instantFee: BigNumber;
}

export const { useGetBNBStatsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBStats: build.query<IFetchStatsResponseData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IFetchStatsResponseData>(
        async () => {
          const sdk = await BinanceSDK.getInstance();

          let aBNBbBalance = ZERO;

          try {
            aBNBbBalance = await sdk.getABBalance();
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(
              `Known error on getting aBNBb data. Zero balance returned. Original response ${error}`,
            );
          }

          const [
            bnbBalance,
            minimumStake,
            relayerFee,
            aBNBcRatio,
            aBNBcBalance,
            aETHBalance,
            aETHRatio,
            poolBalance,
            instantFee,
          ] = await Promise.all([
            sdk.getBNBBalance(),
            sdk.getMinimumStake(),
            sdk.getRelayerFee(),
            sdk.getACRatio(),
            sdk.getACBalance(),
            sdk.getAETHBalance(),
            sdk.getAETHRatio(),
            sdk.getWBNBSwapPoolBalance(),
            sdk.getSwapPoolUnstakeFee(),
          ]);

          return {
            data: {
              aBNBbBalance,
              aBNBcBalance,
              bnbBalance,
              relayerFee,
              aBNBcRatio,
              aETHBalance,
              aETHRatio,
              minStake: minimumStake,
              minAbnbbUnstake: minimumStake,
              minAbnbcUnstake: minimumStake.multipliedBy(aBNBcRatio),
              poolBalance,
              instantFee,
            },
          };
        },
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
