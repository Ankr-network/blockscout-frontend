import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import { PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ETH_SCALE_FACTOR } from 'modules/common/const';

import { selectMaticOnEthAllowance } from './useLazyGetMaticOnEthAllowanceQuery';

export const { useLazyApproveAnkrMaticUnstakeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    approveAnkrMaticUnstake: build.query<boolean, BigNumber>({
      queryFn: queryFnNotifyWrapper<BigNumber, never, boolean>(
        async (amount, { getState }) => {
          const { data: allowance } = selectMaticOnEthAllowance(
            getState() as RootState,
          );

          if (allowance && allowance.isGreaterThanOrEqualTo(amount)) {
            return { data: true };
          }

          const sdk = await PolygonOnEthereumSDK.getInstance();

          const result = await sdk.approveACForAB(amount, ETH_SCALE_FACTOR);

          await result?.receiptPromise;

          return { data: !!result };
        },
      ),
    }),
  }),
});
