import BigNumber from 'bignumber.js';

import { EthereumSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

export const { useGetETHMinStakeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getETHMinStake: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const sdk = await EthereumSDK.getInstance();

        return { data: await sdk.getMinimumStake() };
      }),
    }),
  }),
});
