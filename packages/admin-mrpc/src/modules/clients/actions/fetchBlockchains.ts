import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { filterMapChains, IApiChain } from '../utils/queryChains';

interface IRequestParams {
  token: string;
}

export const {
  useFetchBlockchainsQuery,
  endpoints: { fetchBlockchains },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchBlockchains: build.query<IApiChain[], IRequestParams>({
      queryFn: async ({ token }) => {
        const service = await MultiService.getService();
        const blockchains = await service.getPublicGateway().getBlockchains();
        const formattedPrivateChains = await service.formatPrivateEndpoints(
          blockchains,
          token,
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
