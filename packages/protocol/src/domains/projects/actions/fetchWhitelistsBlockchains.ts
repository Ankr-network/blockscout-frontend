import { BlockchainID, IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { selectAllChainsPaths } from 'modules/chains/store/selectors';
import { RootState } from 'store';

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
      queryFn: createNotifyingQueryFn(
        async ({ group, projects }, { getState }) => {
          const service = MultiService.getService().getAccountingGateway();

          const allBlockchainsPaths = selectAllChainsPaths(
            getState() as RootState,
          );

          const blockchains = await Promise.all(
            projects.map(async projectItem => {
              let blockchainsPaths = await service.getWhitelistBlockchains({
                token: projectItem.userEndpointToken,
                group,
              });

              // empty array of blockchains means all chains are added to project
              if (blockchainsPaths.length === 0) {
                blockchainsPaths = allBlockchainsPaths;
              }

              return {
                userEndpointToken: projectItem.userEndpointToken,
                projectName: projectItem.name,
                blockchains: blockchainsPaths,
                index: projectItem.index,
              };
            }),
          );

          return { data: blockchains };
        },
      ),
    }),
  }),
});
