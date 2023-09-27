import { IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { getUserEndpointToken } from 'domains/jwtToken/action/getAllJwtTokenUtils';
import { makeWorkerGatewayAuthorization } from 'domains/jwtToken/utils/makeWorkerGatewayAuthorization';
import { fetchPremiumStatus } from 'domains/auth/actions/fetchPremiumStatus';

import { GroupJwtData } from '../types';
import { setUserGroupJwt } from '../store';
import { selectEnterpriseStatus } from '../../enterprise/store/selectors';
import { RootState } from '../../../store';

export const {
  endpoints: { userGroupFetchGroupJwt },
  useLazyUserGroupFetchGroupJwtQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userGroupFetchGroupJwt: build.query<
      GroupJwtData | null,
      IApiUserGroupParams
    >({
      queryFn: async ({ group }) => {
        const service = MultiService.getService();
        const accountingGateway = service.getAccountingGateway();

        if (!group) {
          return { data: null };
        }

        const response = await accountingGateway.getGroupJwtToken({ group });
        const decryptedToken = await getUserEndpointToken(
          response.jwt_data,
          false,
        );

        await makeWorkerGatewayAuthorization(response.jwt_data);

        return {
          data: {
            jwtToken: decryptedToken,
            jwtData: response.jwt_data,
          },
        };
      },
      onQueryStarted: async (
        { group },
        { dispatch, queryFulfilled, getState },
      ) => {
        const { data: groupJwt } = await queryFulfilled;

        if (group && groupJwt) {
          dispatch(setUserGroupJwt({ groupAddress: group, ...groupJwt }));

          const state = getState() as RootState;
          const { data: isEnterpriseClient } = selectEnterpriseStatus(state);

          if (groupJwt.jwtToken && !isEnterpriseClient) {
            dispatch(fetchPremiumStatus.initiate(groupJwt.jwtToken));
          }
        }
      },
    }),
  }),
});
