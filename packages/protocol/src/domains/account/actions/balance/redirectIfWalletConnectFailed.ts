import { push } from 'connected-react-router';

import { PATH_ACCOUNT } from 'domains/account/Routes';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { historyInstance } from 'modules/common/utils/historyInstance';
import { web3Api } from 'store/queries';

export const {
  useLazyAccountRedirectIfWalletConnectFailedQuery,
  endpoints: { accountRedirectIfWalletConnectFailed },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountRedirectIfWalletConnectFailed: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_args, { dispatch }) => {
        const link = PricingRoutesConfig.pricing.generatePath();

        if (historyInstance.location.pathname.includes(PATH_ACCOUNT)) {
          dispatch(push(link));

          return { data: true };
        }

        return { data: false };
      }),
    }),
  }),
});
