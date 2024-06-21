import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';

import { RootState } from 'store';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { handleAllowanceQuery } from '../utils/handleAllowanceQuery';
import {
  selectCryptoTxById,
  selectPaymentOptionsByNetworkAndCurrency,
} from '../store/selectors';

export interface ISendAllowanceUsdcParams {
  txId: string;
}

export const {
  endpoints: { sendAllowanceUsdc },
  useSendAllowanceUsdcMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    sendAllowanceUsdc: build.mutation<
      IWeb3SendResult | null,
      ISendAllowanceUsdcParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createWeb3NotifyingQueryFn(
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
                const contractService = web3Service.getUsdcContractService({
                  depositContractAddress,
                  tokenAddress,
                });

                const allowanceResponse =
                  await contractService.setAllowanceForPAYG({
                    allowanceValue: new BigNumber(amount),
                    depositContractAddress,
                    network,
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
