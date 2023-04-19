import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export const {
  endpoints: { authCheckDevdaoInstantJwtParticipant },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authCheckDevdaoInstantJwtParticipant: build.query<boolean, void>({
      queryFn: async () => {
        const service = await MultiService.getService();

        const { is_participant: isParticipant } = await service
          .getAccountGateway()
          .checkDevdaoInstantJwtParticipant();

        return { data: isParticipant };
      },
    }),
  }),
});
