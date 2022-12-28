import { ChainID } from 'modules/chains/types';
import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { checkWhitelistSecretChainsAndGetChainId } from '../const';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { web3Api } from 'store/queries';

export const {
  useInfrastructureFetchRestrictedIpsQuery,
  endpoints: { infrastructureFetchRestrictedIps },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureFetchRestrictedIps: build.query<string[], string>({
      queryFn: createNotifyingQueryFn(async (chainId, { getState }) => {
        credentialsGuard(getState as GetState);

        const service = MultiService.getService();

        const domains = await service
          .getWorkerGateway()
          .getChainRestrictedIps(
            checkWhitelistSecretChainsAndGetChainId(chainId as ChainID),
          );

        return { data: domains };
      }),
    }),
  }),
});
