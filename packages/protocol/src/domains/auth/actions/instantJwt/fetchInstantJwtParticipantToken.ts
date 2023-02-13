import { MultiService } from 'modules/api/MultiService';
import { JwtTokenFullData } from 'multirpc-sdk';
import { web3Api } from 'store/queries';

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

        if (isEncrypted) {
          const web3Service = await MultiService.getWeb3Service();

          const jwtTokenData = await web3Service.upgradeInstantJwtToken(
            jwtData,
          );

          return { data: jwtTokenData };
        }

        const web3ReadService = await MultiService.getWeb3ReadService();

        const jwtTokenData = await web3ReadService.upgradeSyntheticJwtToken(
          jwtData,
        );

        return { data: jwtTokenData };
      },
    }),
  }),
});
