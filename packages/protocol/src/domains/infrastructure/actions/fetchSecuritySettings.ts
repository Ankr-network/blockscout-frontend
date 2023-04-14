import { GetState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { infrastructureFetchRestrictedDomains } from './fetchRestrictedDomains';
import { infrastructureFetchRestrictedIps } from './fetchRestrictedIps';
import { web3Api } from 'store/queries';
import { makeWorkerGatewayAuthorization } from 'domains/jwtToken/utils/makeWorkerGatewayAuthorization';

export interface SecuritySettings {
  domains: string[];
  ips: string[];
}

interface ISecuritySettingsParams {
  chainId: string;
  jwtToken: string;
}

export const {
  endpoints: { infrastructureFetchSecuritySettings },
  useLazyInfrastructureFetchSecuritySettingsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureFetchSecuritySettings: build.query<
      SecuritySettings,
      ISecuritySettingsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ chainId, jwtToken }, { getState, dispatch }) => {
          credentialsGuard(getState as GetState);

          await makeWorkerGatewayAuthorization(jwtToken);

          const [domains, ips] = await Promise.all([
            dispatch(
              infrastructureFetchRestrictedDomains.initiate(chainId),
            ).unwrap(),
            dispatch(
              infrastructureFetchRestrictedIps.initiate(chainId),
            ).unwrap(),
          ]);

          return {
            data: {
              domains,
              ips,
            },
          };
        },
      ),
    }),
  }),
});
