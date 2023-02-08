import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

export const { useLazyGetMaticOnEthAllowanceQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthAllowance: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const sdk = await getPolygonOnEthereumSDK();

        const data = await sdk.getACAllowance();

        return {
          data,
        };
      }, getOnErrorWithCustomText(t('stake-matic-common.errors.allowance'))),
    }),
  }),
});
