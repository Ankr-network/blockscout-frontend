import { push } from 'connected-react-router';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { BaseRoute } from 'modules/router/utils/createRouteConfig';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { GetState, RootState } from 'store';
import { PostTopUpLocationState } from 'modules/layout/components/StatusTransitionDialog/types';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { TopUpOrigin } from 'domains/account/types';
import {
  resetTransaction,
  selectTopUpOrigin,
} from 'domains/account/store/accountTopUpSlice';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';

export const topUpOriginRoutesMap: Record<TopUpOrigin, BaseRoute> = {
  [TopUpOrigin.BILLING]: AccountRoutesConfig.accountDetails,
  [TopUpOrigin.ENDPOINTS]: ChainsRoutesConfig.chains,
  [TopUpOrigin.PRICING]: PricingRoutesConfig.pricing,
};

export const {
  endpoints: { topUpResetTransactionSliceAndRedirect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpResetTransactionSliceAndRedirect: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState, dispatch }) => {
        const address = await getCurrentTransactionAddress(
          getState as GetState,
        );

        const topUpOrigin = selectTopUpOrigin(getState() as RootState);

        const route = topUpOrigin
          ? topUpOriginRoutesMap[topUpOrigin]
          : AccountRoutesConfig.accountDetails;

        dispatch(
          push<PostTopUpLocationState>(route.generatePath(), {
            origin: AccountRoutesConfig.topUp.path,
          }),
        );

        dispatch(resetTransaction({ address }));

        return { data: true };
      }),
    }),
  }),
});
