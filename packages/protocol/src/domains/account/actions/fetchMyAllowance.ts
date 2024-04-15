import { formatFromWei } from 'multirpc-sdk';
import BigNumber from 'bignumber.js';

import { web3Api } from 'store/queries';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

export const {
  endpoints: { fetchMyAllowance },
  useFetchMyAllowanceQuery,
  useLazyFetchMyAllowanceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchMyAllowance: build.query<BigNumber | null, void>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(async ({ web3Service }) => {
          const { currentAccount } = web3Service.getKeyWriteProvider();

          if (!currentAccount) {
            return { data: null };
          }

          const allowanceValue = await web3Service
            .getContractService()
            .getAllowanceValue();

          const hasAllowance = allowanceValue && !allowanceValue.isZero();

          if (!hasAllowance) {
            return { data: null };
          }

          return { data: new BigNumber(formatFromWei(allowanceValue)) };
        }),
        fallback: { data: null },
      }),
    }),
  }),
});
