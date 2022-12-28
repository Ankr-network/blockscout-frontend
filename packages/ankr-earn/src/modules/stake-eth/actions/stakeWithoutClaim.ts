import BigNumber from 'bignumber.js';

import { IWeb3SendResult } from '@ankr.com/provider';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { getEthereumSDK } from '../utils/getEthereumSDK';

/**
 * This method is only for creating a testing ability.
 * It is related to the [STAKAN-1259](https://ankrnetwork.atlassian.net/browse/STAKAN-1259)
 * Do not use it for the production code.
 * @deprecated
 */
export const { useStakeWithoutClaimETHMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    stakeWithoutClaimETH: build.mutation<IWeb3SendResult, BigNumber>({
      queryFn: queryFnNotifyWrapper<BigNumber, never, IWeb3SendResult>(
        async amount => {
          const sdk = await getEthereumSDK();

          return { data: await sdk.stakeWithoutClaim(amount) };
        },
      ),
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
