import BigNumber from 'bignumber.js';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

export interface IFetchANKRAllowanceFeeParams {
  amount: number;
}

export const {
  endpoints: { fetchANKRAllowanceFee },
  useFetchANKRAllowanceFeeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchANKRAllowanceFee: build.query<number, IFetchANKRAllowanceFeeParams>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { amount }, web3Service }) => {
            const contractService = web3Service.getContractService();

            const fee = await contractService.getAllowanceFee(
              new BigNumber(amount),
            );

            return { data: Number(fee) };
          },
        ),
        fallback: { data: 0 },
      }),
    }),
  }),
  overrideExisting: true,
});
