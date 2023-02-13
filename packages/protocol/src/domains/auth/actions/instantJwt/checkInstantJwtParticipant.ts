import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export const {
  endpoints: { authCheckInstantJwtParticipant },
  useAuthCheckInstantJwtParticipantQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authCheckInstantJwtParticipant: build.query<boolean, void>({
      queryFn: async () => {
        const service = await MultiService.getService();

        const { is_participant: isParticipant } = await service
          .getAccountGateway()
          .checkInstantJwtParticipant();

        return { data: isParticipant };
      },
    }),
  }),
});
