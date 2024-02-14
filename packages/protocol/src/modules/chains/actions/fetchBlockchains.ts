import { IBlockchainEntity } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  useChainsFetchBlockchainsQuery,
  useLazyChainsFetchBlockchainsQuery,
  endpoints: { chainsFetchBlockchains },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchBlockchains: build.query<IBlockchainEntity[], void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = MultiService.getService();

        const chains = await service.getPublicGateway().getBlockchains();

        return {
          data: chains,
        };
      }),
    }),
  }),
});
