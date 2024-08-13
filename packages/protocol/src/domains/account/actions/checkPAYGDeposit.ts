import { IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

export interface ICheckPAYGDepositParams extends IApiUserGroupParams {
  from: number;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { checkPAYGDeposit },
  useCheckPAYGDepositQuery,
  useLazyCheckPAYGDepositQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    checkPAYGDeposit: build.query<boolean, ICheckPAYGDepositParams>({
      queryFn: createNotifyingQueryFn(async ({ from, group }) => {
        const api = MultiService.getService().getAccountingGateway();

        const history = await api.getPaymentHistory({
          from,
          group,
          limit: 1,
          order: 'desc',
          order_by: 'timestamp',
          type: ['TRANSACTION_TYPE_DEPOSIT'],
        });

        const isDepositMade = (history.transactions?.length ?? 0) > 0;

        return { data: isDepositMade };
      }),
    }),
  }),
});

export const {
  selectDataCachedByParams: selectIsPAYGDepositMade,
  selectLoadingCachedByParams: selectIsPAYGDepositMadeLoading,
  selectStateCachedByParams: selectIsPAYGDepositMadeState,
} = createQuerySelectors({ endpoint: checkPAYGDeposit });
