import { IEnableTelegramIntegrationParams } from 'multirpc-sdk';

import { web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';

export const {
  endpoints: { confirmTelegramIntegration },
  useConfirmTelegramIntegrationMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    confirmTelegramIntegration: build.mutation<
      string,
      IEnableTelegramIntegrationParams
    >({
      queryFn: async params => {
        const service = MultiService.getService();

        const { result } = await service
          .getAccountingGateway()
          .enableTelegramIntegration(params);

        return { data: result };
      },
    }),
  }),
  overrideExisting: true,
});
