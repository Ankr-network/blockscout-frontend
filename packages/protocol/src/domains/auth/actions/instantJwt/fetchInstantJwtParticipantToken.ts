import { JwtTokenFullData } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { decryptJwt } from './utils/decryptJwt';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

export const {
  endpoints: { authFetchInstantJwtParticipantToken },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authFetchInstantJwtParticipantToken: build.query<
      JwtTokenFullData,
      TwoFAQueryFnParams<unknown>
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ totp }) => {
          const service = await MultiService.getService();

          const { jwt_data: jwtData, is_encrypted: isEncrypted } = await service
            .getAccountGateway()
            .getOrCreateInstantJwt(totp);

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
