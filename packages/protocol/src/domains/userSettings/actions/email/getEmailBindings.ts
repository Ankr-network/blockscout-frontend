import { EmailConfirmationStatus, IEmailResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { userSettingsGetEmailBindings },
  useLazyUserSettingsGetEmailBindingsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingsGetEmailBindings: build.query<
      IEmailResponse[],
      EmailConfirmationStatus | void
    >({
      queryFn: createNotifyingQueryFn(async filters => {
        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .getEmailBindings(filters || undefined);

        return { data };
      }),
    }),
  }),
});
