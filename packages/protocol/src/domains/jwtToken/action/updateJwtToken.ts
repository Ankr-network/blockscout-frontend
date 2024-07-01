import { IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

import { fetchAllJwtTokenRequests } from './getAllJwtToken';

export interface IUpdateJwtTokenParams extends IApiUserGroupParams {
  description?: string;
  name?: string;
  tokenIndex: number;
}

export const {
  endpoints: { updateJwtToken },
  useLazyUpdateJwtTokenQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    updateJwtToken: build.query<boolean, IUpdateJwtTokenParams>({
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

        dispatch(fetchAllJwtTokenRequests.initiate({ group }));
      },
    }),
  }),
});
