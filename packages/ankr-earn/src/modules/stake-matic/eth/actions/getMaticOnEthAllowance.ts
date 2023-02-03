import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

export const {
  useLazyGetMaticOnEthAllowanceQuery,
  endpoints: { getMaticOnEthAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthAllowance: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const sdk = await getPolygonOnEthereumSDK();

        return { data: await sdk.getACAllowance() };
      }, getOnErrorWithCustomText(t('stake-matic-common.errors.allowance'))),
    }),
  }),
});

export const selectMaticOnEthAllowance = getMaticOnEthAllowance.select();
