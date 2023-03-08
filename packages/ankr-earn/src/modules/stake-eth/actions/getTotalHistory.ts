import { t } from '@ankr.com/common';

import { ITxEventsHistoryData } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getEthereumSDK } from '../utils/getEthereumSDK';

export const { useLazyGetETHTotalHistoryQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getETHTotalHistory: build.query<ITxEventsHistoryData, void>({
      queryFn: queryFnNotifyWrapper<void, never, ITxEventsHistoryData>(
        async () => {
          const sdk = await getEthereumSDK();

          return {
            data: await sdk.getTxEventsHistory(),
          };
        },
        error =>
          getExtendedErrorText(error, t('stake-ethereum.errors.history')),
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
