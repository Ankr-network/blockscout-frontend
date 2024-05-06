import { IJwtToken, OauthLoginProvider, WorkerTokenData } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { addSignedWorkerTokenToService } from 'domains/auth/actions/utils/addSignedWorkerTokenToService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

export interface OauthAutoLoginResult {
  authAddress?: string;
  authorizationToken?: string;
  credentials?: IJwtToken;
  email?: string;
  oauthProviders?: OauthLoginProvider[];
  workerTokenData?: WorkerTokenData;
}

export const {
  endpoints: { oauthAutoLogin },
  useLazyOauthAutoLoginQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthAutoLogin: build.query<OauthAutoLoginResult, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState }) => {
        const state = getState() as RootState;

        const {
          authAddress,
          authorizationToken,
          credentials,
          email,
          oauthProviders,
          workerTokenData,
        } = selectAuthData(state);

        const service = MultiService.getService();
        const web3ReadService = await MultiService.getWeb3ReadService();

        web3ReadService.getAccountingGateway().addToken(authorizationToken!);
        service.getEnterpriseGateway().addToken(authorizationToken!);

        const signedWorkerToken = workerTokenData?.signedToken;

        addSignedWorkerTokenToService({ service, signedWorkerToken });

        return {
          data: {
            authAddress,
            authorizationToken,
            credentials,
            email,
            oauthProviders,
            workerTokenData,
          },
        };
      }),
    }),
  }),
});
