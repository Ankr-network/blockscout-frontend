import BigNumber from 'bignumber.js';
import { Web3Address } from 'multirpc-sdk';

import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';

export interface IFetchUSDCAllowanceFeeParams {
  amount: number;
  tokenAddress: Web3Address;
  depositContractAddress: Web3Address;
}

export const {
  endpoints: { fetchUSDCAllowanceFee },
  useFetchUSDCAllowanceFeeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUSDCAllowanceFee: build.query<number, IFetchUSDCAllowanceFeeParams>({
      providesTags: [RequestType.USDCAllowanceFee],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({
            params: { amount, depositContractAddress, tokenAddress },
            web3Service,
          }) => {
            const { currentAccount } = web3Service.getKeyWriteProvider();

            if (currentAccount) {
              const contractService = web3Service.getUsdcContractService({
                depositContractAddress,
                tokenAddress,
              });

              const fee = await contractService.getAllowanceFee(
                new BigNumber(amount),
                depositContractAddress,
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
