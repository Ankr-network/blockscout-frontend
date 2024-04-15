import { IIssueJwtTokenResult } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

export const {
  endpoints: { topUpFetchTransactionConfirmationStatus },
  useLazyTopUpFetchTransactionConfirmationStatusQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpFetchTransactionConfirmationStatus: build.query<
      IIssueJwtTokenResult,
      string
    >({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: transactionHash, web3Service }) => {
            const data = await web3Service
              .getContractService()
              .canIssueJwtToken(transactionHash);

            return { data };
          },
        ),
        fallback: { data: { isReady: false } },
      }),
    }),
  }),
});
