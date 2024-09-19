import { RestrictedIps } from 'multirpc-sdk';
import { ChainID } from '@ankr.com/chains-list';

import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { web3Api } from 'store/queries';
import { makeWorkerGatewayAuthorization } from 'domains/jwtToken/utils/makeWorkerGatewayAuthorization';

import { checkWhitelistSecretChainsAndGetChainId } from '../const';

export interface EditChainRestrictedIpsParams {
  chainId: string;
  ips: string[];
  jwtToken: string;
}

export const {
  endpoints: { infrastructureEditChainRestrictedIps },
  useLazyInfrastructureEditChainRestrictedIpsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureEditChainRestrictedIps: build.query<
      RestrictedIps,
      EditChainRestrictedIpsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ chainId, ips, jwtToken }, { getState }) => {
          credentialsGuard(getState as GetState);

          await makeWorkerGatewayAuthorization(jwtToken);

          const service = MultiService.getService();

          const ipsResult = await service
            .getWorkerGateway()
            .editChainRestrictedIps(
              checkWhitelistSecretChainsAndGetChainId(chainId as ChainID),
              ips,
            );

          if (typeof ipsResult === 'string') {
            throw new Error(ipsResult);
          }

          return { data: ipsResult };
        },
      ),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        dispatch(
          web3Api.util.updateQueryData(
            'infrastructureFetchSecuritySettings' as unknown as never,
            undefined as unknown as never,
            mutationData => {
              Object.assign(mutationData, { ips: [...data] });
            },
          ),
        );
      },
    }),
  }),
});
