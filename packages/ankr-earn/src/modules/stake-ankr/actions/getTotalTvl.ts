import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingReadSDK } from '../api/AnkrStakingSDK';

export const { useGetTotalTvlQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTotalTvl: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const sdk = await AnkrStakingReadSDK.getInstance();

        return { data: await sdk.getTotalTVL() };
      }, getOnErrorWithCustomText(t('stake-ankr.errors.total-tvl'))),
    }),
  }),
});
