import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { selectAddress } from 'domains/auth/store';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';
import { web3Api } from 'store/queries';

export const {
  endpoints: { checkPAYGDeposit },
  useCheckPAYGDepositQuery,
  useLazyCheckPAYGDepositQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    checkPAYGDeposit: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_, { getState }) => {
        const state = getState() as RootState;

        const api = MultiService.getService().getAccountingGateway();

        const authAddress = selectAddress(state);
        const groupConfig = selectUserGroupConfigByAddress(state);
        const group =
          authAddress === groupConfig?.selectedGroupAddress
            ? undefined
            : groupConfig?.selectedGroupAddress;

        const history = await api.getPaymentHistory({
          limit: 1,
          order_by: 'timestamp',
          order: 'desc',
          type: ['TRANSACTION_TYPE_DEPOSIT'],
          group,
        });

        const isDepositMade = (history.transactions?.length ?? 0) > 0;

        return { data: isDepositMade };
      }),
    }),
  }),
});

export const {
  selectData: selectIsPAYGDepositMade,
  selectLoading: selectIsPAYGDepositMadeLoading,
  selectState: selectIsPAYGDepositMadeState,
} = createQuerySelectors({ endpoint: checkPAYGDeposit });
