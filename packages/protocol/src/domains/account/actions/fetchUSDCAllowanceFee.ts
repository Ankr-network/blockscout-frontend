import BigNumber from 'bignumber.js';
import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { RequestType, web3Api } from 'store/queries';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';

export interface IFetchUSDCAllowanceFeeParams {
  amount: number;
  network: EBlockchain;
  tokenAddress: Web3Address;
  depositContractAddress: Web3Address;
  tokenDecimals: number;
}

export const {
  endpoints: { fetchUSDCAllowanceFee },
  useFetchUSDCAllowanceFeeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUSDCAllowanceFee: build.query<number, IFetchUSDCAllowanceFeeParams>({
      providesTags: [RequestType.USDCAllowanceFee],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createWeb3NotifyingQueryFn(
          async ({
            params: {
              amount,
              network,
              depositContractAddress,
              tokenAddress,
              tokenDecimals,
            },
            web3Service,
          }) => {
            const { currentAccount } = web3Service.getKeyWriteProvider();

            if (currentAccount) {
              const contractService = web3Service.getUsdcContractService({
                depositContractAddress,
                tokenAddress,
              });

              const fee = await contractService.getAllowanceFee({
                network,
                tokenAddress,
                amount: new BigNumber(amount),
                depositContractAddress,
                tokenDecimals,
              });

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
