import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { fetchAllJwtTokenRequests } from './getAllJwtToken';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';
import { GetState } from 'store';

export const {
  useLazyDeleteJwtTokenQuery,
  endpoints: { deleteJwtToken },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    deleteJwtToken: build.query<null, number>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async (tokenIndex, { dispatch, getState }) => {
          const service = MultiService.getService().getAccountGateway();
          const group = getSelectedGroupAddress(getState as GetState);

          await service.deleteJwtToken({ index: tokenIndex, group });

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
