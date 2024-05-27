import BigNumber from 'bignumber.js';
import { Web3Address } from 'multirpc-sdk';

import { RequestType, web3Api } from 'store/queries';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';

export interface IFetchUSDTDepositFeeParams {
  amount: number;
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
}

export const {
  endpoints: { fetchUSDTDepositFee },
  useFetchUSDTDepositFeeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUSDTDepositFee: build.query<number, IFetchUSDTDepositFeeParams>({
      providesTags: [RequestType.USDTDepositFee],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createWeb3NotifyingQueryFn(
          async ({
            params: { amount, depositContractAddress, tokenAddress },
            web3Service,
          }) => {
            const { currentAccount } = web3Service.getKeyWriteProvider();

            if (!currentAccount) {
              return { data: 0 };
            }

            const contractService = web3Service.getUsdtContractService({
              depositContractAddress,
              tokenAddress,
            });

            const fee = await contractService.getDepositUSDTToPAYGFee(
              new BigNumber(amount),
              depositContractAddress,
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
