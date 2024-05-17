import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { GetState } from 'store';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { setTopUpTransaction } from 'domains/account/store/accountTopUpSlice';
import { ECurrency } from 'modules/billing/types';

import { getCurrentTransactionAddress } from '../../utils/getCurrentTransactionAddress';

interface IDepositForUserUSDCRequestParams {
  tokenDecimals: number;
  amount: BigNumber;
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  targetAddress: Web3Address;
  network: EBlockchain;
}

export const {
  endpoints: { topUpDepositForUserUSDC },
  useLazyTopUpDepositForUserUSDCQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpDepositForUserUSDC: build.query<
      IWeb3SendResult | null,
      IDepositForUserUSDCRequestParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({
            params: {
              tokenDecimals,
              amount,
              targetAddress,
              depositContractAddress,
              tokenAddress,
              network,
            },
            web3Service,
          }) => {
            const depositResponse = await web3Service
              .getUsdcContractService({
                depositContractAddress,
                tokenAddress,
              })
              .depositUSDCToPAYGForUser({
                amount,
                tokenDecimals,
                targetAddress,
                tokenAddress,
                network,
                depositContractAddress,
              });

            return { data: depositResponse };
          },
        ),
        fallback: { data: null },
      }),
      onQueryStarted: async (_args, { getState, dispatch, queryFulfilled }) => {
        const { data: depositResponse } = await queryFulfilled;

        const address = getCurrentTransactionAddress(getState as GetState);

        if (depositResponse?.transactionHash) {
          dispatch(
            setTopUpTransaction({
              address,
              topUpTransactionHash: depositResponse.transactionHash,
              currency: ECurrency.USDC,
            }),
          );
        }
      },
    }),
  }),
});
