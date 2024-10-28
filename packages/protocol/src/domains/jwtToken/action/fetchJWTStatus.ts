import {
  GetUserEndpointTokenStatusResponse,
  IApiUserGroupParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

export interface IFetchJWTStatusParams extends IApiUserGroupParams {
  userEndpointToken: string;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchJWTStatus },
  useFetchJWTStatusQuery,
  useLazyFetchJWTStatusQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchJWTStatus: build.query<
      GetUserEndpointTokenStatusResponse,
      IFetchJWTStatusParams
    >({
      queryFn: async ({ group, userEndpointToken }) => {
        const service = MultiService.getService().getAccountingGateway();

        const status = await service.getUserEndpointTokenStatus({
          token: userEndpointToken,
          group,
        });

        return { data: status };
      },
    }),
  }),
  overrideExisting: true,
});

const fallback: GetUserEndpointTokenStatusResponse = {
  suspended: false,
  freemium: true,
  frozen: false,
};

export const {
  selectDataWithFallbackCachedByParams: selectJWTStatus,
  selectLoadingCachedByParams: selectJWTStatusLoading,
  selectStateCachedByParams: selectJWTStatusState,
} = createQuerySelectors({ endpoint: fetchJWTStatus, fallback });
