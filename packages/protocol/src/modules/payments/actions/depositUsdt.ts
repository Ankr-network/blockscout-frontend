import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

import { handleDepositQuery } from '../utils/handleDepositQuery';
import {
  selectCryptoTxById,
  selectPaymentOptionsByNetworkAndCurrency,
} from '../store/selectors';

export interface IDepositUsdtParams {
  txId: string;
}

export const {
  endpoints: { depositUsdt },
  useDepositUsdtMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depositUsdt: build.mutation<IWeb3SendResult | null, IDepositUsdtParams>({
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
                const depositResponse = await web3Service
                  .getUsdtContractService({
                    depositContractAddress,
                    tokenAddress,
                  })
                  .depositUSDTToPAYG({
                    amount: new BigNumber(amount),
                    depositContractAddress,
                    network,
                    tokenAddress,
                    tokenDecimals,
                  });

                return { data: depositResponse };
              }
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
