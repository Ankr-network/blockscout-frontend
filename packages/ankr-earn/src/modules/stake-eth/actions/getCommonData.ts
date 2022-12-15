import BigNumber from 'bignumber.js';

import { EthereumSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';

export interface IGetCommonData {
  aETHbBalance: BigNumber;
  aETHcBalance: BigNumber;
  aETHcRatio: BigNumber;
  ethBalance: BigNumber;
}

export const { useGetETHCommonDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getETHCommonData: build.query<IGetCommonData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IGetCommonData>(async () => {
        const sdk = await EthereumSDK.getInstance();

        const isFormatted = true;
        const [ethBalance, aETHbBalance, aETHcBalance, aETHcRatio] =
          await Promise.all([
            sdk.getEthBalance(),
            sdk.getABBalance(isFormatted),
            sdk.getACBalance(isFormatted),
            sdk.getACRatio(isFormatted),
          ]);

        return {
          data: {
            aETHbBalance,
            aETHcBalance,
            aETHcRatio,
            ethBalance,
          },
        };
      }),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
