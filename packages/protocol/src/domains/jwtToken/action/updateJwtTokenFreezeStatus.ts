import {
  IUpdateJwtTokenFreezeStatusParams,
  IUpdateJwtTokenFreezeStatusRequestParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { web3Api } from 'store/queries';

import { fetchJWTStatus } from './fetchJWTStatus';

export const {
  endpoints: { updateJwtTokenFreezeStatus },
  useUpdateJwtTokenFreezeStatusMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    updateJwtTokenFreezeStatus: build.mutation<
      null,
      IUpdateJwtTokenFreezeStatusParams &
        IUpdateJwtTokenFreezeStatusRequestParams
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ freeze, group, token }) => {
          const service = MultiService.getService().getAccountingGateway();

          await service.updateJwtTokenFreezeStatus(
            {
              token,
              group,
            },
            { freeze },
          );

          return { data: null };
        },
      }),
      onQueryStarted: async (
        { group, token: userEndpointToken },
        { dispatch, queryFulfilled },
      ) => {
        await queryFulfilled;

        dispatch(
          fetchJWTStatus.initiate(
            { group, userEndpointToken },
            { forceRefetch: true },
          ),
        );
      },
    }),
  }),
});
