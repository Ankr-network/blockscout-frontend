import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { web3Api } from 'store/queries';

import { fetchAllJwtTokenRequests } from './getAllJwtToken';

interface DeleteJwtTokenParams {
  tokenIndex: number;
  group?: string;
}

export const {
  endpoints: { deleteJwtToken },
  useLazyDeleteJwtTokenQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    deleteJwtToken: build.query<null, TwoFAQueryFnParams<DeleteJwtTokenParams>>(
      {
        queryFn: createQueryFnWithErrorHandler({
          queryFn: async (
            { params: { group, tokenIndex }, totp },
            { dispatch },
          ) => {
            const service = MultiService.getService().getAccountingGateway();

            await service.deleteJwtToken({ index: tokenIndex, group, totp });

            dispatch(fetchAllJwtTokenRequests.initiate({ group }));

            return { data: null };
          },
          errorHandler: error => {
            return {
              error,
            };
          },
        }),
      },
    ),
  }),
});
