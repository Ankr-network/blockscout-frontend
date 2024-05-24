import BigNumber from 'bignumber.js';
import { EBlockchain } from 'multirpc-sdk';
import { IWeb3SendResult } from '@ankr.com/provider';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

import { ECurrency } from '../types';
import { handleAllowanceQuery } from '../utils/handleAllowanceQuery';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface ISendUsdtAllowanceToPaygParams {
  amount: number;
  network: EBlockchain;
  txId: string;
}

const currency = ECurrency.USDT;

export const {
  endpoints: { sendUsdtAllowanceToPayg },
  useSendUsdtAllowanceToPaygMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    sendUsdtAllowanceToPayg: build.mutation<
      IWeb3SendResult | null,
      ISendUsdtAllowanceToPaygParams
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
              const contractService = web3Service.getUsdtContractService({
                depositContractAddress,
                tokenAddress,
              });

              const allowanceResponse =
                await contractService.setAllowanceForPAYG({
                  allowanceValue: new BigNumber(amount),
                  depositContractAddress,
                  tokenAddress,
                  tokenDecimals,
                });

              return { data: allowanceResponse };
            }

            return { data: null };
          },
        ),
        fallback: { data: null },
      }),
      onQueryStarted: async ({ txId }, { dispatch, queryFulfilled }) => {
        await handleAllowanceQuery({ dispatch, queryFulfilled, txId });
      },
    }),
  }),
  overrideExisting: true,
});
