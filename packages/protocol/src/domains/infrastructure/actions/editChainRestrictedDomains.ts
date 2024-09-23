import { RestrictedDomains } from 'multirpc-sdk';
import { ChainID } from '@ankr.com/chains-list';

import { GetState } from 'store';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { MultiService } from 'modules/api/MultiService';
import { makeWorkerGatewayAuthorization } from 'domains/jwtToken/utils/makeWorkerGatewayAuthorization';

import { checkWhitelistSecretChainsAndGetChainId } from '../const';

export interface EditChainRestrictedDomainsParams {
  chainId: string;
  domains: string[];
  jwtToken: string;
}

export const {
  endpoints: { infrastructureEditChainRestrictedDomains },
  useLazyInfrastructureEditChainRestrictedDomainsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureEditChainRestrictedDomains: build.query<
      RestrictedDomains,
      EditChainRestrictedDomainsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ chainId, domains, jwtToken }, { getState }) => {
          credentialsGuard(getState as GetState);

          await makeWorkerGatewayAuthorization(jwtToken);

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
