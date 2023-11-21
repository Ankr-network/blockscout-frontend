import { BlockchainID, IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';

export interface MappedWhitelistBlockchainsResponse {
  userEndpointToken: string;
  blockchains: BlockchainID[];
}

interface FetchWhitelistsBlockchainsParams extends IApiUserGroupParams {
  projects: JwtManagerToken[];
}

export const {
  useLazyFetchWhitelistsBlockchainsQuery,
  endpoints: { fetchWhitelistsBlockchains },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWhitelistsBlockchains: build.query<
      MappedWhitelistBlockchainsResponse[],
      FetchWhitelistsBlockchainsParams
    >({
      providesTags: ['WhitelistBlockchains'],
      queryFn: createNotifyingQueryFn(async ({ group, projects }) => {
        const service = MultiService.getService().getAccountingGateway();

        const blockchains = await Promise.all(
          projects.map(async projectItem => {
            return {
              userEndpointToken: projectItem.userEndpointToken,
              blockchains: await service.getWhitelistBlockchains({
                token: projectItem.userEndpointToken,
                group,
              }),
            };
          }),
        );

        return { data: blockchains };
      }),
    }),
  }),
});
