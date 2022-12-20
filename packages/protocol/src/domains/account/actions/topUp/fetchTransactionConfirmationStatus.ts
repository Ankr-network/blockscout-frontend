import { IIssueJwtTokenResult } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
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
      queryFn: createNotifyingQueryFn(async transactionHash => {
        const service = await MultiService.getWeb3Service();

        const data = await service
          .getContractService()
          .canIssueJwtToken(transactionHash);

        return { data };
      }),
    }),
  }),
});
