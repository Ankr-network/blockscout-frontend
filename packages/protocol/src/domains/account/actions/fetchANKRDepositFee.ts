import BigNumber from 'bignumber.js';

import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';

import { getCurrentAccountBalance } from '../utils/getCurrentAccountBalance';

export interface IFetchANKRDepositFeeParams {
  amount: number;
}

export const {
  endpoints: { fetchANKRDepositFee },
  useFetchANKRDepositFeeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchANKRDepositFee: build.query<number, IFetchANKRDepositFeeParams>({
      providesTags: [RequestType.ANKRDepositFee],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { amount }, web3Service }) => {
            const balance = await getCurrentAccountBalance({ web3Service });

            if (Number(balance) >= amount) {
              const contractService = web3Service.getContractService();

              const fee = await contractService.getDepositAnkrToPAYGFee(
                new BigNumber(amount),
              );

              return { data: Number(fee) };
            }

            return { data: 0 };
          },
        ),
        fallback: { data: 0 },
      }),
    }),
  }),
  overrideExisting: true,
});
