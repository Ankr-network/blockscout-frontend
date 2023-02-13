import { t } from '@ankr.com/common';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

export const {
  useGetLatestBlockNumberQuery,
  endpoints: { getLatestBlockNumber },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getLatestBlockNumber: build.query<number, void>({
      queryFn: queryFnNotifyWrapper<void, never, number>(async () => {
        const sdk = await AnkrStakingSDK.getInstance();

        const data = await sdk.getBlockNumber();

        return { data };
      }, getOnErrorWithCustomText(t('stake-ankr.errors.latest-block-number'))),
    }),
  }),
});

export const selectLatestBlockNumber = getLatestBlockNumber.select();
