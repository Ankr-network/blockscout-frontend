import { IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { filterBonusBundles } from '../utils/filterBonusBundles';

export interface ICheckDealDepositParams extends IApiUserGroupParams {
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
      queryFn: createNotifyingQueryFn(async ({ from, group }) => {
        const api = MultiService.getService().getAccountingGateway();

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
