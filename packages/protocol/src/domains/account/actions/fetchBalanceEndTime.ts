import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { authorizationGuard } from 'domains/auth/utils/authorizationGuard';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { accountFetchBalanceEndTime },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchBalanceEndTime: build.query<number, string[] | undefined>({
      queryFn: createNotifyingQueryFn(async (blockchains, { getState }) => {
        await authorizationGuard(getState as GetState);
        const group = getSelectedGroupAddress(getState as GetState);
        const service = MultiService.getService();

        const endTime = await service
          .getAccountGateway()
          .getBalanceEndTime({ blockchains, group });

        return { data: endTime };
      }),
    }),
  }),
});
