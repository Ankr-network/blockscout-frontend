import { ChainID } from 'domains/chains/types';
import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { web3Api } from 'store/queries';

import { checkWhitelistSecretChainsAndGetChainId } from '../const';

export const {
  useInfrastructureFetchRestrictedDomainsQuery,
  endpoints: { infrastructureFetchRestrictedDomains },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureFetchRestrictedDomains: build.query<string[], string>({
      queryFn: createNotifyingQueryFn(async (chainId, { getState }) => {
        credentialsGuard(getState as GetState);

        const service = MultiService.getService();

        const domains = await service
          .getWorkerGateway()
          .getChainRestrictedDomains(
            checkWhitelistSecretChainsAndGetChainId(chainId as ChainID),
          );

        return { data: domains };
      }),
    }),
  }),
});
