import { BlockchainID, IApiUserGroupParams } from 'multirpc-sdk';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { selectAllChainsPaths } from 'modules/chains/store/selectors';

export interface MappedWhitelistBlockchainsResponse {
  userEndpointToken: string;
  projectName: string;
  blockchains: BlockchainID[];
  index: number;
}

export interface FetchWhitelistsBlockchainsParams extends IApiUserGroupParams {
  projects: JWT[];
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
      providesTags: [RequestType.WhitelistsBlockchains],
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
