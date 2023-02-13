import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { convertFromWei } from 'modules/common/utils/numbers/convertFromWei';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

export const {
  useLazyGetAnkrAllowanceQuery,
  endpoints: { getAnkrAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getAnkrAllowance: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const sdk = await AnkrStakingSDK.getInstance();

        const allowance = await sdk.getAllowance();

        return { data: convertFromWei(allowance.toString()) };
      }),
    }),
  }),
});

export const selectAnkrAllowance = getAnkrAllowance.select();
