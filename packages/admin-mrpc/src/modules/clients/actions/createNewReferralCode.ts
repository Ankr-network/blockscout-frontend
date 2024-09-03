import {
  INewReferralCodeRequest,
  INewReferralCodeResponse,
} from 'multirpc-sdk';

import { AuthCacheTags, web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export const {
  useCreateNewReferralCodeMutation,
  endpoints: { createNewReferralCode },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    createNewReferralCode: build.mutation<
      INewReferralCodeResponse,
      INewReferralCodeRequest
    >({
      queryFn: async params => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const deleteResponse = await backofficeGateway.createNewReferralCode(
          params,
        );

        return {
          data: deleteResponse,
        };
      },
      invalidatesTags: [AuthCacheTags.referralCoderData],
    }),
  }),
});
