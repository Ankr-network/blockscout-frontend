import { EventData } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { topUpGetLastLockedFundsEvent },
  useLazyTopUpGetLastLockedFundsEventQuery,
  useTopUpGetLastLockedFundsEventQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpGetLastLockedFundsEvent: build.query<EventData | false, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = await MultiService.getWeb3Service();
        const provider = service.getKeyProvider();
        const { currentAccount: address } = provider;

        const data = await service
          .getContractService()
          .getLastLockedFundsEvent(address);

        return { data: data || false };
      }),
    }),
  }),
});
