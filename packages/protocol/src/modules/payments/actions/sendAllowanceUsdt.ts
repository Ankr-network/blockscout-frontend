import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

import { handleAllowanceQuery } from '../utils/handleAllowanceQuery';
import {
  selectCryptoTxById,
  selectPaymentOptionsByNetworkAndCurrency,
} from '../store/selectors';

export interface ISendAllowanceUsdtParams {
  txId: string;
}

export const {
  endpoints: { sendAllowanceUsdt },
  useSendAllowanceUsdtMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    sendAllowanceUsdt: build.mutation<
      IWeb3SendResult | null,
      ISendAllowanceUsdtParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { txId }, web3Service }, { getState }) => {
            const state = getState() as RootState;

            const tx = selectCryptoTxById(state, txId);

            if (tx) {
              const { amount, currency, network } = tx;

              const { depositContractAddress, tokenAddress, tokenDecimals } =
                selectPaymentOptionsByNetworkAndCurrency(
                  state,
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
