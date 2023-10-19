import { BlockchainID, IApiUserGroupParams } from 'multirpc-sdk';

import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

export interface MappedWhitelistBlockchainsResponse {
  userEndpointToken: string;
  blockchains: BlockchainID[];
}

export const {
  useLazyFetchWhitelistBlockchainsQuery,
  endpoints: { fetchWhitelistBlockchains },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWhitelistBlockchains: build.query<
      MappedWhitelistBlockchainsResponse[],
      IApiUserGroupParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group }, { getState }) => {
        const service = MultiService.getService().getAccountingGateway();

        const projects = selectJwtTokens(getState() as RootState);

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
