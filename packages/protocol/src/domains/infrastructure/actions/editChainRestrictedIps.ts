import { RestrictedIps } from 'multirpc-sdk';

import { ChainID } from 'modules/chains/types';
import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { checkWhitelistSecretChainsAndGetChainId } from '../const';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { web3Api } from 'store/queries';

export interface EditChainRestrictedIpsParams {
  chainId: string;
  ips: string[];
}

export const {
  useLazyInfrastructureEditChainRestrictedIpsQuery,
  endpoints: { infrastructureEditChainRestrictedIps },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureEditChainRestrictedIps: build.query<
      RestrictedIps,
      EditChainRestrictedIpsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ chainId, ips }, { getState }) => {
          credentialsGuard(getState as GetState);

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
