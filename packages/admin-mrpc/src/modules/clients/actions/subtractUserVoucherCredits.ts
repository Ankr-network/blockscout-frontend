import { web3Api } from 'store/queries/web3Api';
import { MultiService } from '../../api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';
import {
  IUpdateVoucherCreditsRequest,
  IUpdateVoucherCreditsResponse,
} from 'multirpc-sdk';
import { toast } from 'react-toastify';

export const {
  useSubtractUserVoucherCreditsMutation,
  endpoints: { subtractUserVoucherCredits },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    subtractUserVoucherCredits: build.mutation<
      IUpdateVoucherCreditsResponse,
      IUpdateVoucherCreditsRequest
    >({
      queryFn: async formData => {
        const service = await MultiService.getInstance();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();

        const response = await backofficeGateway.updateVoucherCredits(formData);
        return {
          data: response,
        };
      },
      onQueryStarted: async (
        { address, amountType, amount },
        { queryFulfilled },
      ) => {
        queryFulfilled
          .then(res => {
            const { data } = res;
            if (data.success) {
              toast.success(
                `Subtracted ${amount} ${amountType} for ${address}`,
              );
            } else {
              toast.error(
                `Failed to subtract ${amount} ${amountType} for ${address}. Try again`,
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
