import {
  AvailableWriteProviders,
  EEthereumNetworkId,
  EthereumWeb3KeyProvider,
} from '@ankr.com/provider';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { getProviderManager } from 'modules/api/getProviderManager';
import { setNetworkId } from 'domains/wallet/store/walletSlice';
import { web3Api } from 'store/queries';

export const {
  endpoints: { switchNetwork },
  useSwitchNetworkMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    switchNetwork: build.mutation<null, EEthereumNetworkId>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(async ({ params: chainId }) => {
          const provider =
            await getProviderManager().getProvider<EthereumWeb3KeyProvider>(
              AvailableWriteProviders.ethCompatible,
            );

          const chainIdNumber = chainId as unknown as number;

          await provider.switchNetwork(chainIdNumber);

          // strange hack, it's necessary to investigate it and fix inside provider lib
          // TODO: https://ankrnetwork.atlassian.net/browse/MRPC-4768
          provider.currentChain = chainIdNumber;

          return { data: null };
        }),
        fallback: { data: null },
      }),
      onQueryStarted: async (networkId, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(setNetworkId(networkId));
      },
    }),
  }),
});
