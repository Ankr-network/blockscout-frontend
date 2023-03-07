import { t } from '@ankr.com/common';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingReadSDK } from '../api/AnkrStakingSDK';
import { IApyData } from '../api/AnkrStakingSDK/types';

export const {
  useGetAPYQuery,
  endpoints: { getAPY },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getAPY: build.query<IApyData[], void>({
      queryFn: queryFnNotifyWrapper<void, never, IApyData[]>(
        async () => {
          const sdk = await AnkrStakingReadSDK.getInstance();

          const data = await sdk.getAPY();

          return { data };
        },
        error => getExtendedErrorText(error, t('stake-ankr.errors.apy')),
      ),
    }),
  }),
});
