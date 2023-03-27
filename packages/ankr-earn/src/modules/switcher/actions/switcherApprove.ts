import { IWeb3SendResult } from '@ankr.com/provider';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { SwitcherSDK } from '../api/SwitcherSDK';
import { AvailableSwitcherToken, AvailableSwitchNetwork } from '../const';

export interface IApproveArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
}

export const { useSwitcherApproveMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    switcherApprove: build.mutation<IWeb3SendResult | undefined, IApproveArgs>({
      queryFn: queryFnNotifyWrapper<
        IApproveArgs,
        never,
        IWeb3SendResult | undefined
      >(async ({ chainId, token }) => {
        const sdk = await SwitcherSDK.getInstance();

        return { data: await sdk.approve({ chainId, token }) };
      }),
    }),
  }),
});
