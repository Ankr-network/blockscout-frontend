import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { fetchAllJwtTokenRequests } from './getAllJwtToken';

export const {
  useLazyDeleteJwtTokenQuery,
  endpoints: { deleteJwtToken },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    deleteJwtToken: build.query<null, number>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async (tokenIndex, { dispatch }) => {
          const service = MultiService.getService().getAccountGateway();

          await service.deleteJwtToken(tokenIndex);

          dispatch(fetchAllJwtTokenRequests.initiate());

          return { data: null };
        },
        errorHandler: error => {
          return {
            error,
          };
        },
      }),
    }),
  }),
});
