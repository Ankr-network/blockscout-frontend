import BigNumber from 'bignumber.js';
import { EBlockchain, Web3Address } from 'multirpc-sdk';
import { IWeb3SendResult } from '@ankr.com/provider';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

import { ECurrency } from '../types';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';
import { handleDepositQuery } from '../utils/handleDepositQuery';

export interface IDepositUsdtToPaygForUserParams {
  amount: BigNumber;
  network: EBlockchain;
  targetAddress: Web3Address;
  txId: string;
}

const currency = ECurrency.USDT;

export const {
  endpoints: { depositUsdtToPaygForUser },
  useDepositUsdtToPaygForUserMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depositUsdtToPaygForUser: build.mutation<
      IWeb3SendResult | null,
      IDepositUsdtToPaygForUserParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async (
            { params: { amount, network, targetAddress }, web3Service },
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
                .depositUSDTToPAYGForUser(
                  amount,
                  tokenDecimals,
                  targetAddress,
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
