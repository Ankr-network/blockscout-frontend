import {
  IUpdateJwtTokenFreezeStatusParams,
  IUpdateJwtTokenFreezeStatusRequestParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { RootState } from 'store';

import { fetchAllJwtTokenRequests } from './getAllJwtToken';
import { fetchAllJwtTokensStatuses } from './getAllJwtTokensStatuses';
import { selectConfiguredProjectJwtTokens } from '../store/selectors';

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
        errorHandler: error => {
          return {
            error,
          };
        },
      }),
      onQueryStarted: async (
        { group },
        { dispatch, getState, queryFulfilled },
      ) => {
        await queryFulfilled;

        const projects = selectConfiguredProjectJwtTokens(
          getState() as RootState,
        );

        dispatch(
          fetchAllJwtTokenRequests.initiate({ group }, { forceRefetch: true }),
        );
        dispatch(
          fetchAllJwtTokensStatuses.initiate(
            { group, projects },
            { forceRefetch: true },
          ),
        );
      },
    }),
  }),
});
