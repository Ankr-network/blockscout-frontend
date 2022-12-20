import { RestrictedDomains } from 'multirpc-sdk';

import { ChainID } from 'modules/chains/types';
import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { checkWhitelistSecretChainsAndGetChainId } from '../const';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { web3Api } from 'store/queries';

export interface EditChainRestrictedDomainsParams {
  chainId: string;
  domains: string[];
}

export const {
  useLazyInfrastructureEditChainRestrictedDomainsQuery,
  endpoints: { infrastructureEditChainRestrictedDomains },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureEditChainRestrictedDomains: build.query<
      RestrictedDomains,
      EditChainRestrictedDomainsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ chainId, domains }, { getState }) => {
          credentialsGuard(getState as GetState);

          const service = MultiService.getService();

          const domainsResult = await service
            .getWorkerGateway()
            .editChainRestrictedDomains(
              checkWhitelistSecretChainsAndGetChainId(chainId as ChainID),
              domains,
            );

          if (typeof domainsResult === 'string') {
            throw new Error(domainsResult);
          }

          return { data: domainsResult };
        },
      ),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        dispatch(
          web3Api.util.updateQueryData(
            'infrastructureFetchSecuritySettings' as unknown as never,
            undefined as unknown as never,
            mutationData => {
              Object.assign(mutationData, { domains: [...data] });
            },
          ),
        );
      },
    }),
  }),
});
