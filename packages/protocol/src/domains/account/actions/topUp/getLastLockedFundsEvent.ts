import { EventData } from 'multirpc-sdk';

import { GetState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { web3Api } from 'store/queries';

export const {
  endpoints: { topUpGetLastLockedFundsEvent },
  useLazyTopUpGetLastLockedFundsEventQuery,
  useTopUpGetLastLockedFundsEventQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpGetLastLockedFundsEvent: build.query<EventData | false, void>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ web3Service }, { getState }) => {
            const address = getCurrentTransactionAddress(getState as GetState);

            const data = await web3Service
              .getContractService()
              .getLastLockedFundsEvent(address);

            return { data: data || false };
          },
        ),
        fallback: { data: false },
      }),
    }),
  }),
});
