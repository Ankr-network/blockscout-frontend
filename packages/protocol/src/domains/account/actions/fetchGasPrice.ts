import {
  AvailableWriteProviders,
  EthereumWeb3KeyProvider,
} from '@ankr.com/provider';
import BigNumber from 'bignumber.js';

import { getProviderManager } from 'modules/api/getProviderManager';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { ZERO } from 'modules/common/constants/const';

export const { useGetGasPriceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getGasPrice: build.query<BigNumber, void>({
      queryFn: createNotifyingQueryFn<void, never, BigNumber>(async () => {
        const provider =
          await getProviderManager().getProvider<EthereumWeb3KeyProvider>(
            AvailableWriteProviders.ethCompatible,
          );

        const web3 = provider.getWeb3();

        const gasPrice = await web3.eth.getGasPrice();

        return {
          data: new BigNumber(web3.utils.fromWei(gasPrice)) ?? ZERO,
        };
      }),
    }),
  }),
  overrideExisting: true,
});
