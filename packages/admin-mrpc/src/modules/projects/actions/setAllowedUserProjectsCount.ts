import { toast } from 'react-toastify';
import { SetUserProjectAllowedJwtNumberParams } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from 'modules/clients/utils/authorizeBackoffice';

export const {
  useSetAllowedUserProjectsCountMutation,
  endpoints: { setAllowedUserProjectsCount },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    setAllowedUserProjectsCount: build.mutation<
      null,
      SetUserProjectAllowedJwtNumberParams
    >({
      queryFn: async params => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();

        await backofficeGateway.setUserProjectAllowedJwtNumber(params);

        return {
          data: null,
        };
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        await queryFulfilled;

        toast.success(`Allowed tokens count is successfully set`);
      },
    }),
  }),
  overrideExisting: true,
});
