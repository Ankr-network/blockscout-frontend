import BigNumber from 'bignumber.js';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

export interface IFetchANKRDepositFeeParams {
  amount: number;
}

export const {
  endpoints: { fetchANKRDepositFee },
  useFetchANKRDepositFeeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchANKRDepositFee: build.query<number, IFetchANKRDepositFeeParams>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { amount }, web3Service }) => {
            const contractService = web3Service.getContractService();

            const fee = await contractService.getDepositAnkrToPAYGFee(
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
