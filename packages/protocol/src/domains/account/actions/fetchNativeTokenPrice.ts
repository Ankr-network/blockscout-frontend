import {
  AvailableWriteProviders,
  EthereumWeb3KeyProvider,
} from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import { getTokenPriceByChainId } from 'multirpc-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { ZERO } from 'modules/common/constants/const';

export const { useGetNativeTokenPriceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getNativeTokenPrice: build.query<BigNumber, void>({
      queryFn: createNotifyingQueryFn<void, never, BigNumber>(async () => {
        const provider =
          await getProviderManager().getProvider<EthereumWeb3KeyProvider>(
            AvailableWriteProviders.ethCompatible,
          );

        const price = await getTokenPriceByChainId(provider.currentChain);

        return {
          data: price ?? ZERO,
        };
      }),
    }),
  }),
  overrideExisting: true,
});
