import { t } from '@ankr.com/common';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

export const { useGetEpochEndSecondsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getEpochEndSeconds: build.query<number, void>({
      queryFn: queryFnNotifyWrapper<void, never, number>(
        async () => {
          const sdk = await AnkrStakingSDK.getInstance();
          const provider = await sdk.getProvider();

          return {
            data: await sdk.getEpochEndSeconds(await provider.getBlockNumber()),
          };
        },
        error => getExtendedErrorText(error, t('stake-ankr.errors.epoch-end')),
      ),
    }),
  }),
});