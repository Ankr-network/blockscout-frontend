import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { SwitcherSDK } from '../api/SwitcherSDK';
import {
  AvailableSwitcherToken,
  AvailableSwitchNetwork,
  SwitcherCacheTags,
} from '../const';

export interface IGetSwitcherDataArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
}

export interface IGetSwitcherData {
  abBalance: BigNumber;
  acBalance: BigNumber;
  ratio: BigNumber;
  allowance: BigNumber;
}

export const { useGetSwitcherDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSwitcherData: build.query<
      IGetSwitcherData | undefined,
      IGetSwitcherDataArgs
    >({
      queryFn: queryFnNotifyWrapper<
        IGetSwitcherDataArgs,
        never,
        IGetSwitcherData | undefined
      >(async ({ chainId, token }) => {
        const sdk = await SwitcherSDK.getInstance();

        return {
          data: await sdk.getCommonData({ chainId, token }),
        };
      }),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [SwitcherCacheTags.common],
    }),
  }),
});
