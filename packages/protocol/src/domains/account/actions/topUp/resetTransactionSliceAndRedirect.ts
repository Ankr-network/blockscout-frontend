import { push } from 'connected-react-router';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { GetState, RootState } from 'store';
import { PostTopUpLocationState } from 'modules/layout/components/StatusTransitionDialog/types';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { resetTransaction } from 'domains/account/store/accountTopUpSlice';
import {
  selectMyBundles,
  selectTopUpOrigin,
} from 'domains/account/store/selectors';
import { topUpOriginRoutesMap } from 'domains/account/screens/CardPaymentSuccess/utils/getOriginRoute';
import { web3Api } from 'store/queries';

export const {
  endpoints: { topUpResetTransactionSliceAndRedirect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpResetTransactionSliceAndRedirect: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState, dispatch }) => {
        const address = getCurrentTransactionAddress(getState as GetState);

        const topUpOrigin = selectTopUpOrigin(getState() as RootState);
        const bundles = selectMyBundles(getState() as RootState);

        const route = topUpOrigin
          ? topUpOriginRoutesMap[topUpOrigin]
          : AccountRoutesConfig.accountDetails;

        dispatch(
          push<PostTopUpLocationState>(route.generatePath(), {
            origin:
              bundles.length > 0 ? undefined : AccountRoutesConfig.topUp.path,
          }),
        );

        dispatch(resetTransaction({ address }));

        return { data: true };
      }),
    }),
  }),
});
