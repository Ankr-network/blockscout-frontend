import BigNumber from 'bignumber.js';

import { EthereumSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { CacheTags } from '../const';

export interface IGetClaimableData {
  claimableAETHB: BigNumber;
  claimableAETHC: BigNumber;
}

export const {
  useGetETHClaimableDataQuery,
  endpoints: { getETHClaimableData },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getETHClaimableData: build.query<IGetClaimableData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IGetClaimableData>(
        async () => {
          const sdk = await EthereumSDK.getInstance();

          const [claimableAETHB, claimableAETHC] = await Promise.all([
            sdk.getClaimable(Token.aETHb),
            sdk.getClaimable(Token.aETHc),
          ]);

          return {
            data: {
              claimableAETHB,
              claimableAETHC,
            },
          };
        },
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});

export const selectETHClaimableData = getETHClaimableData.select();
