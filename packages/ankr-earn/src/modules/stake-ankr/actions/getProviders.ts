import { t } from '@ankr.com/common';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IValidator } from '../api/AnkrStakingSDK/types';

export const { useGetProvidersQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getProviders: build.query<IValidator[], void>({
      queryFn: queryFnNotifyWrapper<void, never, IValidator[]>(
        async () => {
          const sdk = await AnkrStakingSDK.getInstance();

          return {
            data: await sdk.getAllValidators(),
          };
        },
        error => getExtendedErrorText(error, t('stake-ankr.errors.providers')),
      ),
    }),
  }),
});
