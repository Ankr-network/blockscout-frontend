import { IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

import { fetchEnterpriseEndpoints } from './fetchEnterpriseEndpoints';
import {
  setUserGroupConfig,
  UserGroupConfigWithAddress,
} from '../../userGroup/store';

interface FetchIsEnterpriseClientParams extends IApiUserGroupParams {
  newUserGroupConfig?: UserGroupConfigWithAddress;
}

export const {
  endpoints: { fetchIsEnterpriseClient },
  useLazyFetchIsEnterpriseClientQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchIsEnterpriseClient: build.query<
      boolean,
      FetchIsEnterpriseClientParams
    >({
      queryFn: async ({ group, newUserGroupConfig }, { dispatch }) => {
        const service = MultiService.getService();

        try {
          const { is_client: isEnterpriseClient } = await service
            .getEnterpriseGateway()
            .checkIsClient({ group });

          if (newUserGroupConfig) {
            await dispatch(setUserGroupConfig(newUserGroupConfig));
          }

          return { data: isEnterpriseClient };
        } catch (error) {
          if (newUserGroupConfig) {
            await dispatch(setUserGroupConfig(newUserGroupConfig));
          }

          return { data: false };
        }
      },
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        const { data: isEnterpriseClient } = await queryFulfilled;

        if (isEnterpriseClient) {
          dispatch(fetchEnterpriseEndpoints.initiate({ params }));
        }
      },
    }),
  }),
  overrideExisting: true,
});
