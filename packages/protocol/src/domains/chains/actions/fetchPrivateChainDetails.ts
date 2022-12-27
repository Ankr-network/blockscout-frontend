import { replace } from 'connected-react-router';

import { ChainsRoutesConfig } from '../routes/routesConfig';
import { IApiChain } from '../api/queryChains';
import { RootState } from 'store';
import { chainsFetchPrivateChains } from 'domains/chains/actions/fetchPrivateChains';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { t } from 'modules/i18n/utils/intl';
import { web3Api } from 'store/queries';

export const {
  useChainsFetchPrivateChainDetailsQuery,
  endpoints: { chainsFetchPrivateChainDetails },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPrivateChainDetails: build.query<IApiChain, string>({
      queryFn: createNotifyingQueryFn(
        async (chainId, { getState, dispatch }) => {
          const { data: { chains: privateChains = [] } = {} } =
            chainsFetchPrivateChains.select()(getState() as RootState);

          const privateChainDetails = privateChains.find(
            item => item.id === chainId,
          );

          if (!privateChainDetails) {
            dispatch(replace(ChainsRoutesConfig.chains.generatePath()));

            throw new Error(t('chain-item.not-found'));
          }

          return { data: privateChainDetails };
        },
      ),
    }),
  }),
});
