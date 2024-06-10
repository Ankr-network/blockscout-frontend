import { IIssueJwtTokenResult } from 'multirpc-sdk';

import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

interface ITopUpFetchTransactionConfirmationStatusParams {
  transactionHash: string;
  confirmationBlocksNumber: number;
}

export const {
  endpoints: { topUpFetchTransactionConfirmationStatus },
  useLazyTopUpFetchTransactionConfirmationStatusQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpFetchTransactionConfirmationStatus: build.query<
      IIssueJwtTokenResult,
      ITopUpFetchTransactionConfirmationStatusParams
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createWeb3NotifyingQueryFn(
          async ({
            params: { transactionHash, confirmationBlocksNumber },
            web3Service,
          }) => {
            const data = await web3Service
              .getContractService()
              .canIssueJwtToken(transactionHash, confirmationBlocksNumber);

            return { data };
          },
        ),
        fallback: { data: { isReady: false } },
      }),
    }),
  }),
});
