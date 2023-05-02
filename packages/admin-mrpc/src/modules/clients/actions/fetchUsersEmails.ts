import { IEmailBindingEntity, IEmailBindingsRequest } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from '../../api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';
import { MAX_EMAILS_REQUEST_COUNT } from '../const';

export const {
  useLazyFetchUsersEmailsQuery,
  endpoints: { fetchUsersEmails },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUsersEmails: build.query<
      IEmailBindingEntity[],
      IEmailBindingsRequest
    >({
      queryFn: async ({ filter_type, filter  }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();

        const emails =
          await backofficeGateway.getEmailBindings({
            limit: MAX_EMAILS_REQUEST_COUNT,
            filter,
            filter_type,
          });

        return {
          data: emails.bindings || [],
        };
      },
    }),
  }),
  overrideExisting: true,
});
