import { IDeleteReferralCodeResponse } from 'multirpc-sdk';

import { AuthCacheTags, web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export const {
  useDeleteReferralCodeMutation,
  endpoints: { deleteReferralCode },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    deleteReferralCode: build.mutation<IDeleteReferralCodeResponse, string>({
      queryFn: async code => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const deleteResponse = await backofficeGateway.deleteReferralCode(code);

        return {
          data: deleteResponse,
        };
      },
      invalidatesTags: [AuthCacheTags.referralCoderData],
    }),
  }),
});
