import BigNumber from 'bignumber.js';
import { EBlockchain, Web3Address } from 'multirpc-sdk';
import { IWeb3SendResult } from '@ankr.com/provider';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

import { ECurrency } from '../types';
import { handleDepositQuery } from '../utils/handleDepositQuery';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IDepositUsdcToPaygForUserParams {
  amount: number;
  network: EBlockchain;
  targetAddress: Web3Address;
  txId: string;
}

const currency = ECurrency.USDC;

export const {
  endpoints: { depostUsdcToPaygForUser },
  useDepostUsdcToPaygForUserMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depostUsdcToPaygForUser: build.mutation<
      IWeb3SendResult | null,
      IDepositUsdcToPaygForUserParams
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
                .getUsdcContractService({
                  depositContractAddress,
                  tokenAddress,
                })
                .depositUSDCToPAYGForUser(
                  new BigNumber(amount),
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
