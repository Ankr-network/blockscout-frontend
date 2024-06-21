import { JwtTokenFullData } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

import { decryptJwt } from './utils/decryptJwt';

export const {
  endpoints: { authFetchDevdaoInstantJwtParticipantToken },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authFetchDevdaoInstantJwtParticipantToken: build.query<
      JwtTokenFullData,
      TwoFAQueryFnParams<unknown>
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ totp }) => {
          const service = await MultiService.getService();

          const { is_encrypted: isEncrypted, jwt_data: jwtData } = await service
            .getAccountingGateway()
            .getOrCreateDevdaoInstantJwt(totp);

          const jwtTokenData = await decryptJwt(jwtData, isEncrypted);

          return { data: jwtTokenData };
        },
        errorHandler: error => {
          return {
            error,
          };
        },
      }),
    }),
  }),
});
