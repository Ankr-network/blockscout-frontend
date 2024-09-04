import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { Chain } from 'modules/chains/types';
import { selectPublicBlockchains } from 'modules/chains/store/selectors';
import { RootState } from 'store';

export interface FetchPublicChainsResult {
  chains: Chain[];
}

export const {
  endpoints: { chainsFetchPublicChains },
  useLazyChainsFetchPublicChainsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPublicChains: build.query<FetchPublicChainsResult, void>({
      queryFn: createNotifyingQueryFn(async (_params, { getState }) => {
        const chains = selectPublicBlockchains(getState() as RootState);

        return {
          data: {
            chains,
          },
        };
      }),
    }),
  }),
});
