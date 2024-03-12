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

interface IGetTokenPriceProps {
  tokenAddress?: string;
}

export const { useGetTokenPriceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTokenPrice: build.query<BigNumber, IGetTokenPriceProps>({
      queryFn: createNotifyingQueryFn<IGetTokenPriceProps, never, BigNumber>(
        async ({ tokenAddress }) => {
          const provider =
            await getProviderManager().getProvider<EthereumWeb3KeyProvider>(
              AvailableWriteProviders.ethCompatible,
            );

          const price = await getTokenPriceByChainId(
            provider.currentChain,
            tokenAddress,
          );

          return {
            data: price ?? ZERO,
          };
        },
      ),
    }),
  }),
  overrideExisting: true,
});
