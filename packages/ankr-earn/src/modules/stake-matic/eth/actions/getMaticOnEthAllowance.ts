import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

export const {
  useLazyGetMaticOnEthAllowanceQuery,
  endpoints: { getMaticOnEthAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthAllowance: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(
        async () => {
          const sdk = await getPolygonOnEthereumSDK();

          const data = await sdk.getACAllowance();

          return {
            data,
          };
        },
        error =>
          getExtendedErrorText(error, t('stake-matic-common.errors.allowance')),
      ),
    }),
  }),
});
