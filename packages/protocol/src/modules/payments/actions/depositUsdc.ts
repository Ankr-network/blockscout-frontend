import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';

import { RootState } from 'store';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { handleDepositQuery } from '../utils/handleDepositQuery';
import {
  selectCryptoTxById,
  selectPaymentOptionsByNetworkAndCurrency,
} from '../store/selectors';

export interface IDepositUsdcParams {
  txId: string;
}

export const {
  endpoints: { depositUsdc },
  useDepositUsdcMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depositUsdc: build.mutation<IWeb3SendResult | null, IDepositUsdcParams>({
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
                const depositResponse = await web3Service
                  .getUsdcContractService({
                    depositContractAddress,
                    tokenAddress,
                  })
                  .depositUSDCToPAYG({
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
      onQueryStarted: async ({ txId }, { dispatch, queryFulfilled }) => {
        await handleDepositQuery({ dispatch, queryFulfilled, txId });
      },
    }),
  }),
  overrideExisting: true,
});
