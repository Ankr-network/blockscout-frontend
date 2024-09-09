import { BlockchainID, IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';

export interface MappedWhitelistBlockchainsResponse {
  userEndpointToken: string;
  projectName: string;
  blockchains: BlockchainID[];
  index: number;
}

export interface FetchWhitelistsBlockchainsParams extends IApiUserGroupParams {
  projects: JwtManagerToken[];
}

export const {
  endpoints: { fetchWhitelistsBlockchains },
  useFetchWhitelistsBlockchainsQuery,
  useLazyFetchWhitelistsBlockchainsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWhitelistsBlockchains: build.query<
      MappedWhitelistBlockchainsResponse[],
      FetchWhitelistsBlockchainsParams
    >({
      providesTags: [RequestType.WhitelistBlockchains],
      queryFn: createNotifyingQueryFn(async ({ group, projects }) => {
        const service = MultiService.getService().getAccountingGateway();

        const blockchains = await Promise.all(
          projects.map(async projectItem => {
            return {
              userEndpointToken: projectItem.userEndpointToken,
              projectName: projectItem.name,
              blockchains: await service.getWhitelistBlockchains({
                token: projectItem.userEndpointToken,
                group,
              }),
              index: projectItem.index,
            };
          }),
        );

        return { data: blockchains };
      }),
    }),
  }),
});
