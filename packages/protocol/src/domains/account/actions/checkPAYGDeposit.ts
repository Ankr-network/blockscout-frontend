import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { selectAddress } from 'domains/auth/store';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';
import { web3Api } from 'store/queries';

export interface ICheckPAYGDepositParams {
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
      queryFn: createNotifyingQueryFn(async ({ from }, { getState }) => {
        const state = getState() as RootState;

        const api = MultiService.getService().getAccountingGateway();

        const authAddress = selectAddress(state);
        const groupConfig = selectUserGroupConfigByAddress(state);
        const group =
          authAddress === groupConfig?.selectedGroupAddress
            ? undefined
            : groupConfig?.selectedGroupAddress;

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
