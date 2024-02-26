import { EventData } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { GetState } from 'store';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';

export const {
  endpoints: { topUpGetLastLockedFundsEvent },
  useLazyTopUpGetLastLockedFundsEventQuery,
  useTopUpGetLastLockedFundsEventQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpGetLastLockedFundsEvent: build.query<EventData | false, void>({
      queryFn: createNotifyingQueryFn(async (_, { getState }) => {
        const service = MultiService.getWeb3Service();

        const address = await getCurrentTransactionAddress(
          getState as GetState,
        );

        const data = await service
          .getContractService()
          .getLastLockedFundsEvent(address);

        return { data: data || false };
      }),
    }),
  }),
});
