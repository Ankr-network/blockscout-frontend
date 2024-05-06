import { formatFromWei } from 'multirpc-sdk';

import { web3Api } from 'store/queries';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

export const {
  endpoints: { fetchMyAllowanceAnkr },
  useFetchMyAllowanceAnkrQuery,
  useLazyFetchMyAllowanceAnkrQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchMyAllowanceAnkr: build.query<number, void>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(async ({ web3Service }) => {
          const { currentAccount } = web3Service.getKeyWriteProvider();

          if (!currentAccount) {
            return { data: 0 };
          }

          const allowanceValue = await web3Service
            .getContractService()
            .getAllowanceValue();

          const hasAllowance = allowanceValue && !allowanceValue.isZero();

          if (!hasAllowance) {
            return { data: 0 };
          }

          return { data: Number(formatFromWei(allowanceValue)) };
        }),
        fallback: { data: 0 },
      }),
    }),
  }),
});
