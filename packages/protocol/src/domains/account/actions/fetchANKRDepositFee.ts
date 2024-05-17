import BigNumber from 'bignumber.js';
import { formatToWei } from 'multirpc-sdk';

import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';

import { getCurrentAccountBalanceAnkr } from '../utils/getCurrentAccountBalanceAnkr';

export interface IFetchANKRDepositFeeParams {
  amount: number;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
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
            const { currentAccount } = web3Service.getKeyWriteProvider();

            if (!currentAccount) {
              return { data: 0 };
            }

            const balance = await getCurrentAccountBalanceAnkr({ web3Service });

            if (Number(balance) >= amount) {
              const contractService = web3Service.getContractService();

              const fee = await contractService.getDepositAnkrToPAYGFee(
                formatToWei(new BigNumber(amount)),
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
