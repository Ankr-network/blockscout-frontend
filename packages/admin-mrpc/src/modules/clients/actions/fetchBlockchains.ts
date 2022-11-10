import { Web3Address } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { filterMapChains, IApiChain } from '../utils/queryChains';

interface IRequestParams {
  token: string;
  address: Web3Address;
}

export const {
  useFetchBlockchainsQuery,
  endpoints: { fetchBlockchains },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchBlockchains: build.query<IApiChain[], IRequestParams>({
      queryFn: async ({ token, address }) => {
        const service = await MultiService.getInstance();
        const blockchains = await service.getPublicGateway().getBlockchains();
        const formattedPrivateChains = await service.formatPrivateChains(
          blockchains,
          // we need only user token string here to generate the chain urls
          // @ts-ignore
          {
            owner_address: address,
            endpoint_token: token,
          },
        );
        const filteredChains = filterMapChains(formattedPrivateChains);

        return {
          data: filteredChains,
        };
      },
    }),
  }),
  overrideExisting: true,
});
