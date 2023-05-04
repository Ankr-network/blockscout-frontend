import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { authorizationGuard } from 'domains/auth/utils/authorizationGuard';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { IApiUserGroupParams } from 'multirpc-sdk';

export interface IRequestBalanceEndTimeParams extends IApiUserGroupParams {
  blockchains?: string[];
}

export const {
  endpoints: { accountFetchBalanceEndTime },
  useLazyAccountFetchBalanceEndTimeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchBalanceEndTime: build.query<
      number,
      IRequestBalanceEndTimeParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ blockchains, group }, { getState }) => {
          await authorizationGuard(getState as GetState);

          const service = MultiService.getService();

          const endTime = await service
            .getAccountGateway()
            .getBalanceEndTime({
              blockchains: blockchains ?? undefined,
              group,
            });

          return { data: endTime };
        },
      ),
    }),
  }),
});
