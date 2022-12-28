import { IProvider } from 'multirpc-sdk';

import { GetState } from 'store';
import { MultiService } from '../../../modules/api/MultiService';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { web3Api } from 'store/queries';

export const {
  useLazyInfrastructureFetchProviderQuery,
  endpoints: { infrastructureFetchProvider },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureFetchProvider: build.query<IProvider, void>({
      queryFn: async (_args, { getState }) => {
        credentialsGuard(getState as GetState);

        const service = MultiService.getService();

        const provider = await service.getWorkerGateway().getProvider();

        return { data: provider };
      },
    }),
  }),
});
