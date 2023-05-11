import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { fetchAllJwtTokenRequests } from './getAllJwtToken';
import { IApiUserGroupParams } from 'multirpc-sdk';

interface IRequestParams extends IApiUserGroupParams {
  tokenIndex: number;
}

export const {
  useLazyDeleteJwtTokenQuery,
  endpoints: { deleteJwtToken },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    deleteJwtToken: build.query<null, IRequestParams>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ tokenIndex, group }, { dispatch }) => {
          const service = MultiService.getService().getAccountGateway();

          await service.deleteJwtToken({ index: tokenIndex, group });

          dispatch(fetchAllJwtTokenRequests.initiate({ group }));

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
