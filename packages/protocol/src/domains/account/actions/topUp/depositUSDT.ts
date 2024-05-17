import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { GetState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { setTopUpTransaction } from 'domains/account/store/accountTopUpSlice';
import { web3Api } from 'store/queries';
import { ECurrency } from 'modules/billing/types';

interface ITopUpDepositUSDTQueryParams {
  tokenDecimals: number;
  amount: BigNumber;
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  network: EBlockchain;
}

export const {
  endpoints: { topUpDepositUSDT },
  useLazyTopUpDepositUSDTQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpDepositUSDT: build.query<
      IWeb3SendResult | null,
      ITopUpDepositUSDTQueryParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async (
            {
              params: {
                tokenDecimals,
                amount,
                depositContractAddress,
                tokenAddress,
                network,
              },
              web3Service,
            },
            { getState, dispatch },
          ) => {
            const address = getCurrentTransactionAddress(getState as GetState);

            const depositResponse = await web3Service
              .getUsdtContractService({
                depositContractAddress,
                tokenAddress,
              })
              .depositUSDTToPAYG({
                amount,
                tokenDecimals,
                tokenAddress,
                network,
                depositContractAddress,
              });

            if (depositResponse.transactionHash) {
              dispatch(
                setTopUpTransaction({
                  address,
                  topUpTransactionHash: depositResponse.transactionHash,
                  currency: ECurrency.USDT,
                }),
              );
            }

            return { data: depositResponse };
          },
        ),
        fallback: { data: null },
      }),
    }),
  }),
});
