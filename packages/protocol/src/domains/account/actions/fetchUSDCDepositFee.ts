import BigNumber from 'bignumber.js';
import { Web3Address } from 'multirpc-sdk';

import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';

import { getCurrentAccountBalanceUSDC } from '../utils/getCurrentAccountBalanceUSDC';

export interface IFetchUSDCDepositFeeParams {
  amount: number;
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
}

export const {
  endpoints: { fetchUSDCDepositFee },
  useFetchUSDCDepositFeeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUSDCDepositFee: build.query<number, IFetchUSDCDepositFeeParams>({
      providesTags: [RequestType.USDCDepositFee],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
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

            if (!currentAccount) {
              return { data: 0 };
            }

            const balance = await getCurrentAccountBalanceUSDC({
              web3Service,
              depositContractAddress,
              tokenAddress,
              tokenDecimals,
            });

            if (Number(balance) >= amount) {
              const contractService = web3Service.getUsdcContractService({
                depositContractAddress,
                tokenAddress,
              });

              const fee = await contractService.getDepositUSDCToPAYGFee(
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
