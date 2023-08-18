import {
  IAddVoucherCreditsRequest,
  IAddVoucherCreditsResponse,
} from 'multirpc-sdk';
import { toast } from 'react-toastify';

import { web3Api } from 'store/queries/web3Api';

import { MultiService } from '../../api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export const {
  useAddUserVoucherCreditsMutation,
  endpoints: { addUserVoucherCredits },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    addUserVoucherCredits: build.mutation<
      IAddVoucherCreditsResponse,
      IAddVoucherCreditsRequest
    >({
      queryFn: async formData => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const response = await backofficeGateway.addVoucherCredits(formData);

        return {
          data: response,
        };
      },
      onQueryStarted: async (
        { address, amountType, amount, expiresAt },
        { queryFulfilled },
      ) => {
        queryFulfilled
          .then(res => {
            const { data } = res;

            if (data.success) {
              toast.success(
                `Added ${
                  expiresAt ? `temporary` : ''
                } ${amount} ${amountType} for ${address}`,
              );
            } else {
              toast.error(
                `Failed to add ${amount} ${amountType} for ${address}. Try again`,
              );
            }
          })
          .catch(error => {
            toast.error({ message: error.message });
            throw error;
          });
      },
    }),
  }),
  overrideExisting: true,
});
