import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingReadSDK } from '../api/AnkrStakingSDK';
import { TEMPORARY_APY } from '../const';

export const { useGetMaxApyQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaxApy: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const sdk = await AnkrStakingReadSDK.getInstance();

        const apyData = await sdk.getAPY();

        const maxApy = apyData?.sort((a, b) =>
          a.apy.isGreaterThan(b.apy) ? -1 : 1,
        );

        return { data: maxApy[0].apy ?? TEMPORARY_APY };
      }, getOnErrorWithCustomText(t('stake-ankr.errors.max-apy'))),
    }),
  }),
});
