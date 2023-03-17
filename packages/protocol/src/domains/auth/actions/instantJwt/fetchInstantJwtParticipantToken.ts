import { MultiService } from 'modules/api/MultiService';
import { JwtTokenFullData } from 'multirpc-sdk';
import { web3Api } from 'store/queries';
import { decryptJwt } from './utils/decryptJwt';

export const {
  endpoints: { authFetchInstantJwtParticipantToken },
  useAuthFetchInstantJwtParticipantTokenQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authFetchInstantJwtParticipantToken: build.query<JwtTokenFullData, void>({
      queryFn: async () => {
        const service = await MultiService.getService();

        const { jwt_data: jwtData, is_encrypted: isEncrypted } = await service
          .getAccountGateway()
          .getOrCreateInstantJwt();

        const jwtTokenData = await decryptJwt(jwtData, isEncrypted);

        return { data: jwtTokenData };
      },
    }),
  }),
});
