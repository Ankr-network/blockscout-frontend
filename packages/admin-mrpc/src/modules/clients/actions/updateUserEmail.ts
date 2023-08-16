import {
  IUpdateUserEmailRequest,
  IUpdateUserEmailResponse,
} from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';
import { handleUpdateUserEmailResponse } from '../utils/handleUpdateUserEmailResponse';

export const {
  useUpdateUserEmailMutation,
  endpoints: { updateUserEmail },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    updateUserEmail: build.mutation<
      IUpdateUserEmailResponse,
      IUpdateUserEmailRequest
    >({
      queryFn: async params => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const emailData = await backofficeGateway.updateUserEmail(params);

        return {
          data: emailData,
        };
      },
      onQueryStarted: handleUpdateUserEmailResponse,
    }),
  }),
  overrideExisting: true,
});
