import { GetState, RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { infrastructureFetchRestrictedDomains } from './fetchRestrictedDomains';
import { infrastructureFetchRestrictedIps } from './fetchRestrictedIps';
import { web3Api } from 'store/queries';
import { makeWorkerGatewayAuthorization } from 'domains/jwtToken/utils/makeWorkerGatewayAuthorization';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { selectAuthData } from 'domains/auth/store/authSlice';

export interface SecuritySettings {
  domains: string[];
  ips: string[];
}

interface ISecuritySettingsParams {
  chainId: string;
  selectedJwtTokenIndex: number;
  jwtTokens: JwtManagerToken[];
}

const getJwtToken = (
  state: RootState,
  jwtTokens: JwtManagerToken[],
  selectedTokenIndex: number,
) => {
  const { workerTokenData } = selectAuthData(state);

  if (selectedTokenIndex > 0) {
    return jwtTokens.find(item => item.index === selectedTokenIndex)?.jwtData;
  }

  return workerTokenData?.signedToken;
};

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
        async (
          { chainId, selectedJwtTokenIndex, jwtTokens },
          { getState, dispatch },
        ) => {
          credentialsGuard(getState as GetState);

          const jwtToken = getJwtToken(
            getState() as RootState,
            jwtTokens,
            selectedJwtTokenIndex,
          );

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
