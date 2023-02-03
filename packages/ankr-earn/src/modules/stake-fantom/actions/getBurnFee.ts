import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { getFantomSDK } from '../utils/getFantomSDK';

export const { useLazyGetFTMBurnFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getFTMBurnFee: build.query<BigNumber, BigNumber>({
      queryFn: queryFnNotifyWrapper<BigNumber, never, BigNumber>(
        async amount => {
          const sdk = await getFantomSDK();

          return { data: await sdk.getBurnFee(amount) };
        },
        getOnErrorWithCustomText(t('stake-fantom.errors.burn-fee')),
      ),
    }),
  }),
});
