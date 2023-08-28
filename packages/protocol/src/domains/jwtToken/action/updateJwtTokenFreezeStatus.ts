import {
  IUpdateJwtTokenFreezeStatusParams,
  IUpdateJwtTokenFreezeStatusRequestParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

import { fetchAllJwtTokenRequests } from './getAllJwtToken';
import { fetchAllJwtTokensStatuses } from './getAllJwtTokensStatuses';

export const {
  useLazyUpdateJwtTokenFreezeStatusQuery,
  endpoints: { updateJwtTokenFreezeStatus },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    updateJwtTokenFreezeStatus: build.query<
      null,
      IUpdateJwtTokenFreezeStatusParams &
        IUpdateJwtTokenFreezeStatusRequestParams
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ token, group, freeze }) => {
          const service = MultiService.getService().getAccountGateway();

          await service.updateJwtTokenFreezeStatus(
            {
              token,
              group,
            },
            { freeze },
          );

          return { data: null };
        },
        errorHandler: error => {
          return {
            error,
          };
        },
      }),
      onQueryStarted: async ({ group }, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(fetchAllJwtTokenRequests.initiate({ group }));
        dispatch(fetchAllJwtTokensStatuses.initiate());
      },
    }),
  }),
});
