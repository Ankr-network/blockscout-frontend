import { toast } from 'react-toastify';
import { DeleteUserProjectParams } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from 'modules/clients/utils/authorizeBackoffice';
import { getUserProjects } from './getUserProjects';

export const {
  useDeleteUserProjectMutation,
  endpoints: { deleteUserProject },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    deleteUserProject: build.mutation<null, DeleteUserProjectParams>({
      queryFn: async params => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();

        await backofficeGateway.deleteUserProject(params);

        return {
          data: null,
        };
      },
      onQueryStarted: async ({ address }, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(getUserProjects.initiate({ address }, { forceRefetch: true }));

        toast.success(`Project was successfully deleted`);
      },
    }),
  }),
  overrideExisting: true,
});
