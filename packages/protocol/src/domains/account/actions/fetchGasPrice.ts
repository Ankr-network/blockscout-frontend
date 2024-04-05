import {
  AvailableWriteProviders,
  EthereumWeb3KeyProvider,
} from '@ankr.com/provider';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getProviderManager } from 'modules/api/getProviderManager';
import { web3Api } from 'store/queries';

import { ZERO_STRING } from '../store/const';

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  useFetchGasPriceQuery,
  endpoints: { fetchGasPrice },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchGasPrice: build.query<string, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const provider =
          await getProviderManager().getProvider<EthereumWeb3KeyProvider>(
            AvailableWriteProviders.ethCompatible,
          );

        const web3 = provider.getWeb3();

        const gasPrice = await web3.eth.getGasPrice();

        return {
          data: web3.utils.fromWei(gasPrice) ?? ZERO_STRING,
        };
      }),
    }),
  }),
  overrideExisting: true,
});
