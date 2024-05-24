import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { EBlockchain } from 'multirpc-sdk';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

import { ECurrency } from '../types';
import { handleDepositQuery } from '../utils/handleDepositQuery';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IDepositUsdtToPaygParams {
  amount: number;
  network: EBlockchain;
  txId: string;
}

const currency = ECurrency.USDT;

export const {
  endpoints: { depositUsdtToPayg },
  useDepositUsdtToPaygMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depositUsdtToPayg: build.mutation<
      IWeb3SendResult | null,
      IDepositUsdtToPaygParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async (
            { params: { amount, network }, web3Service },
            { getState },
          ) => {
            const { depositContractAddress, tokenAddress, tokenDecimals } =
              selectPaymentOptionsByNetworkAndCurrency(
                getState() as RootState,
                network,
                currency,
              );

            if (depositContractAddress && tokenAddress && tokenDecimals) {
              const depositResponse = await web3Service
                .getUsdtContractService({
                  depositContractAddress,
                  tokenAddress,
                })
                .depositUSDTToPAYG(
                  new BigNumber(amount),
                  tokenDecimals,
                  tokenAddress,
                  depositContractAddress,
                );

              return { data: depositResponse };
            }

            return { data: null };
          },
        ),
        fallback: { data: null },
      }),
      onQueryStarted: async ({ txId }, { queryFulfilled, dispatch }) => {
        await handleDepositQuery({ dispatch, queryFulfilled, txId });
      },
    }),
  }),
  overrideExisting: true,
});
