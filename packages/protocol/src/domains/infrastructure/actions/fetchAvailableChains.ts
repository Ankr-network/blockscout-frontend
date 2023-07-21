import { Chain } from 'domains/chains/types';
import { RootState } from 'store';
import { chainsFetchPublicChains } from 'domains/chains/actions/public/fetchPublicChains';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { infrastructureFetchProvider } from './fetchProvider';

export const {
  useInfrastructureFetchAvailableChainsQuery,
  endpoints: { infrastructureFetchAvailableChains },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureFetchAvailableChains: build.query<Chain[], void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState, dispatch }) => {
        const { data: { chains = [] } = {} } = await dispatch(
          chainsFetchPublicChains.initiate(),
        );

        const { data: providerData } = infrastructureFetchProvider.select()(
          getState() as RootState,
        );

        if (typeof providerData === 'object') {
          const { blockchains } = providerData;

          if (!blockchains || blockchains.length === 0) {
            return { data: chains };
          }

          const data = blockchains
            .map(item => chains?.find(el => el.id === item))
            .filter(Boolean) as Chain[];

          return { data };
        }

        return { data: [] };
      }),
    }),
  }),
});
