import BigNumber from 'bignumber.js';

import { ANKR_ABI } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { getProviderManager } from 'modules/api/getProviderManager';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';

export const { useGetAnkrBalanceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAnkrBalance: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const providerManager = getProviderManager();
        const provider = await providerManager.getETHWriteProvider();
        const { currentAccount } = provider;
        const { contractConfig } = configFromEnv();
        const ankrContract = provider.createContract(
          ANKR_ABI,
          contractConfig.ankrToken,
        );

        return {
          data: await provider.getErc20Balance(ankrContract, currentAccount),
        };
      }),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
