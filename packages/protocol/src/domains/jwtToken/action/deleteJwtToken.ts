import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

import { fetchJWTs } from './fetchJWTs';

interface DeleteJwtTokenParams {
  tokenIndex: number;
  group?: string;
}

export const {
  endpoints: { deleteJwtToken },
  useDeleteJwtTokenMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    deleteJwtToken: build.mutation<
      null,
      TwoFAQueryFnParams<DeleteJwtTokenParams>
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async (
          { params: { group, tokenIndex }, totp },
          { dispatch },
        ) => {
          const service = MultiService.getService().getAccountingGateway();

          await service.deleteJwtToken({ index: tokenIndex, group, totp });

          dispatch(fetchJWTs.initiate({ group }, { forceRefetch: true }));

          return { data: null };
        },
      }),
    }),
  }),
});
