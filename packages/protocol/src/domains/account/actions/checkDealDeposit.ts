import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { selectAddress } from 'domains/auth/store';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';
import { web3Api } from 'store/queries';

import { filterBonusBundles } from '../utils/filterBonusBundles';

export interface ICheckDealDepositParams {
  from: number;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { checkDealDeposit },
  useCheckDealDepositQuery,
  useLazyCheckDealDepositQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    checkDealDeposit: build.query<boolean, ICheckDealDepositParams>({
      queryFn: createNotifyingQueryFn(async ({ from }, { getState }) => {
        const state = getState() as RootState;

        const api = MultiService.getService().getAccountingGateway();

        const authAddress = selectAddress(state);
        const groupConfig = selectUserGroupConfigByAddress(state);
        const group =
          authAddress === groupConfig?.selectedGroupAddress
            ? undefined
            : groupConfig?.selectedGroupAddress;

        const { bundles } = await api.getMyBundlesPaymentsHistory({
          from,
          group,
          limit: 2, // taking 2 to filter possible referral bonus bundle
        });

        const isDepositMade = filterBonusBundles(bundles).length > 0;

        return { data: isDepositMade };
      }),
    }),
  }),
});

export const {
  selectDataCachedByParams: selectIsDealDepositMade,
  selectLoadingCachedByParams: selectIsDealDepositMadeLoading,
  selectStateCachedByParams: selectIsDealDepositMadeState,
} = createQuerySelectors({ endpoint: checkDealDeposit });
