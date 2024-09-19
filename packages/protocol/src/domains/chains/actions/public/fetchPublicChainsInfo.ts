import { Chain } from '@ankr.com/chains-list';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { selectPublicBlockchains } from 'modules/chains/store/selectors';
import { RootState } from 'store';

export interface IFetchPublicChainsInfoResult {
  chains: Chain[];
  allChains: Chain[];
}

export const { endpoints, useChainsFetchPublicChainsInfoQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      chainsFetchPublicChainsInfo: build.query<
        IFetchPublicChainsInfoResult,
        void
      >({
        queryFn: createNotifyingQueryFn(async (_args, { getState }) => {
          const chains = selectPublicBlockchains(getState() as RootState);

          return {
            data: {
              chains,
              allChains: chains,
            },
          };
        }),
      }),
    }),
  });
