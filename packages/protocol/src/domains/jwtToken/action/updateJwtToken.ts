import { IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { web3Api } from 'store/queries';

import { fetchJWTs } from './fetchJWTs';

export interface IUpdateJwtTokenParams extends IApiUserGroupParams {
  description?: string;
  name?: string;
  tokenIndex: number;
}

export const {
  endpoints: { updateJwtToken },
  useUpdateJwtTokenMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    updateJwtToken: build.mutation<boolean, IUpdateJwtTokenParams>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ description, group, name, tokenIndex }) => {
          const service = MultiService.getService().getAccountingGateway();

          await service.updateJwtToken(
            { description, name },
            { index: tokenIndex, group },
          );

          return { data: true };
        },
        errorHandler: error => ({ error }),
      }),
      onQueryStarted: async ({ group }, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(fetchJWTs.initiate({ group }, { forceRefetch: true }));
      },
    }),
  }),
});
