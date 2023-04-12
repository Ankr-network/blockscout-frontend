import { IApiUserGroupParams } from 'multirpc-sdk';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { getUserEndpointToken } from 'domains/jwtToken/action/getAllJwtTokenUtils';
import { makeWorkerGatewayAuthorization } from 'domains/jwtToken/utils/makeWorkerGatewayAuthorization';

interface GroupJwtData {
  jwtToken?: string;
  jwtData?: string;
}

export const {
  endpoints: { userGroupFetchGroupJwt },
  useLazyUserGroupFetchGroupJwtQuery,
  useUserGroupFetchGroupJwtQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userGroupFetchGroupJwt: build.query<
      GroupJwtData | null,
      IApiUserGroupParams
    >({
      queryFn: async ({ group }) => {
        const service = MultiService.getService();
        const accountGateway = service.getAccountGateway();

        if (!group) {
          return { data: null };
        }

        const response = await accountGateway.getGroupJwtToken({ group });
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
    }),
  }),
});
