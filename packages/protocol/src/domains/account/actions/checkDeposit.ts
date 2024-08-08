import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { selectAddress } from 'domains/auth/store';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';
import { web3Api } from 'store/queries';

import { selectHasActiveDeal } from '../store/selectors';

export const {
  endpoints: { checkDeposit },
  useCheckDepositQuery,
  useLazyCheckDepositQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    checkDeposit: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_, { getState }) => {
        const state = getState() as RootState;

        const hasActiveDeal = selectHasActiveDeal(state);

        if (hasActiveDeal) {
          return { data: hasActiveDeal };
        }

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

        if (isDepositMade) {
          return { data: isDepositMade };
        }

        return { data: false };
      }),
    }),
  }),
});

export const {
  selectData: selectIsDepositMade,
  selectLoading: selectIsDepositMadeLoading,
  selectState: selectIsDepositMadeState,
} = createQuerySelectors({ endpoint: checkDeposit });
