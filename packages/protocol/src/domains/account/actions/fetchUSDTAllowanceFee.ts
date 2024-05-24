import BigNumber from 'bignumber.js';
import { Web3Address } from 'multirpc-sdk';

import { RequestType, web3Api } from 'store/queries';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';

export interface IFetchUSDTAllowanceFeeParams {
  amount: number;
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
}

export const {
  endpoints: { fetchUSDTAllowanceFee },
  useFetchUSDTAllowanceFeeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUSDTAllowanceFee: build.query<number, IFetchUSDTAllowanceFeeParams>({
      providesTags: [RequestType.USDTAllowanceFee],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createWeb3NotifyingQueryFn(
          async ({
            params: {
              amount,
              depositContractAddress,
              tokenAddress,
              tokenDecimals,
            },
            web3Service,
          }) => {
            const { currentAccount } = web3Service.getKeyWriteProvider();

            if (currentAccount) {
              const contractService = web3Service.getUsdtContractService({
                depositContractAddress,
                tokenAddress,
              });

              const fee = await contractService.getAllowanceFee(
                new BigNumber(amount),
                depositContractAddress,
                tokenDecimals,
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
