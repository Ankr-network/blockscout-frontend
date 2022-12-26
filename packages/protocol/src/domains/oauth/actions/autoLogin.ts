import { IJwtToken, WorkerTokenData } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

export interface OauthAutoLoginResult {
  address?: string;
  authorizationToken?: string;
  credentials?: IJwtToken;
  email?: string;
  workerTokenData?: WorkerTokenData;
}

export const {
  endpoints: { oauthAutoLogin },
  useLazyOauthAutoLoginQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthAutoLogin: build.query<OauthAutoLoginResult, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState }) => {
        const {
          credentials,
          authorizationToken,
          workerTokenData,
          address,
          email,
        } = selectAuthData(getState() as RootState);

        const service = MultiService.getService();
        const web3ReadService = await MultiService.getWeb3ReadService();

        web3ReadService
          .getOauthGateway()
          .addToken(authorizationToken as string);

        service.getAccountGateway().addToken(authorizationToken as string);
        service.getOauthGateway().addToken(authorizationToken as string);

        if (workerTokenData?.signedToken) {
          service.getWorkerGateway().addJwtToken(workerTokenData?.signedToken);
        }

        return {
          data: {
            credentials,
            authorizationToken,
            workerTokenData,
            email,
            address,
          },
        };
      }),
    }),
  }),
});
