import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { GetState } from 'store';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { setTopUpTransaction } from 'domains/account/store/accountTopUpSlice';
import { web3Api } from 'store/queries';
import { ECurrency } from 'modules/billing/types';

interface ITopUpDepositUSDCQueryParams {
  tokenDecimals: number;
  amount: BigNumber;
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  network: EBlockchain;
}

export const {
  endpoints: { topUpDepositUSDC },
  useLazyTopUpDepositUSDCQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpDepositUSDC: build.query<
      IWeb3SendResult | null,
      ITopUpDepositUSDCQueryParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createWeb3NotifyingQueryFn(
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
              .getUsdcContractService({
                depositContractAddress,
                tokenAddress,
              })
              .depositUSDCToPAYG({
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
                  currency: ECurrency.USDC,
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
