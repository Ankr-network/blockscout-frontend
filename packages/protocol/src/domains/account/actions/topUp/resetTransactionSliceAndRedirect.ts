import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { BaseRoute } from 'modules/router/utils/createRouteConfig';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { GetState } from 'store';
import { PostTopUpLocationState } from 'modules/layout/components/StatusTransitionDialog/types';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { TopUpOrigin } from 'domains/account/types';
import {
  resetTransaction,
  selectTopUpOrigin,
} from 'domains/account/store/accountTopUpSlice';

const topUpOriginRoutesMap: Record<TopUpOrigin, BaseRoute> = {
  [TopUpOrigin.BILLING]: AccountRoutesConfig.accountDetails,
  [TopUpOrigin.ENDPOINTS]: ChainsRoutesConfig.chains,
  [TopUpOrigin.PRICING]: PricingRoutesConfig.pricing,
};

export const resetTransactionSliceAndRedirect = async (
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  getState: GetState,
  address: string,
) => {
  const topUpOrigin = selectTopUpOrigin(getState());

  const route = topUpOrigin
    ? topUpOriginRoutesMap[topUpOrigin]
    : AccountRoutesConfig.accountDetails;

  dispatch(
    push<PostTopUpLocationState>(route.generatePath(), {
      origin: AccountRoutesConfig.topUp.path,
    }),
  );

  dispatch(resetTransaction({ address }));
};
