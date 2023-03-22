import {
  IUpdateUserEmailRequest,
  IUpdateUserEmailResponse,
} from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';
import { handleUpdateUserEmailResponse } from '../utils/handleUpdateUserEmailResponse';

export const {
  useCreateUserEmailMutation,
  endpoints: { createUserEmail },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createUserEmail: build.mutation<
      IUpdateUserEmailResponse,
      IUpdateUserEmailRequest
    >({
      queryFn: async params => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();

        const emailData = await backofficeGateway.createUserEmail(params);

        return {
          data: emailData,
        };
      },
      onQueryStarted: handleUpdateUserEmailResponse,
    }),
  }),
  overrideExisting: true,
});
