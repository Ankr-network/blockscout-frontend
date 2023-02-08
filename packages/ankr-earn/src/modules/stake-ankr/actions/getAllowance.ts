import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { convertFromWei } from 'modules/common/utils/numbers/convertFromWei';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

export const {
  useLazyGetAllowanceQuery,
  endpoints: { getAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getAllowance: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const sdk = await AnkrStakingSDK.getInstance();

        const allowance = await sdk.getAllowance();

        return { data: convertFromWei(allowance.toString()) };
      }),
    }),
  }),
});

export const selectAnkrAllowance = getAllowance.select();
