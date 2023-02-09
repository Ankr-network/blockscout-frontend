import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';

export const {
  useLazyGetMNGOAllowanceQuery,
  endpoints: { getMNGOAllowance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getMNGOAllowance: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(async () => {
        const sdk = await GnosisStakingSDK.getInstance();

        return { data: await sdk.getAllowance() };
      }),
    }),
  }),
});

export const selectMNGOAllowance = getMNGOAllowance.select();
