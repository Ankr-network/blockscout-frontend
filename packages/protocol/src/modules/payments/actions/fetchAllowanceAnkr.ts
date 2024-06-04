import { formatFromWei } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

const fallback = 0;

export const {
  endpoints: { fetchAllowanceAnkr },
  useFetchAllowanceAnkrQuery,
  useLazyFetchAllowanceAnkrQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllowanceAnkr: build.query<number, void>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(async ({ web3Service }) => {
          const { currentAccount } = web3Service.getKeyWriteProvider();

          if (!currentAccount) {
            return { data: fallback };
          }

          const allowanceValue = await web3Service
            .getContractService()
            .getAllowanceValue();

          const hasAllowance = allowanceValue && !allowanceValue.isZero();

          if (!hasAllowance) {
            return { data: fallback };
          }

          return { data: Number(formatFromWei(allowanceValue)) };
        }),
        fallback: { data: fallback },
      }),
    }),
  }),
});

export const {
  selectState: selectAllowanceAnkrState,
  selectDataWithFallback: selectAllowanceAnkr,
  selectLoading: selectAllowanceAnkrLoading,
} = createQuerySelectors({ endpoint: fetchAllowanceAnkr, fallback });
