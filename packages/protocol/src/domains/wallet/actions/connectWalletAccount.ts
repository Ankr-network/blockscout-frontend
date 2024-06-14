import { t } from '@ankr.com/common';

import { INJECTED_WALLET_ID, MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import {
  createWeb3Service,
  selectHasWeb3Service,
} from 'domains/auth/actions/connect/createWeb3Service';
import { hasMetamask } from 'domains/auth/utils/hasMetamask';
import { web3Api } from 'store/queries';

import { connectAccount } from '../utils/connectAccount';

export interface IFetchANKRAllowanceFeeParams {
  amount: number;
}

const walletId = INJECTED_WALLET_ID;

export const {
  endpoints: { connectWalletAccount },
  useConnectWalletAccountMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    connectWalletAccount: build.mutation<string | null, void>({
      queryFn: createNotifyingQueryFn(async (_args, { dispatch, getState }) => {
        const state = getState() as RootState;

        if (!hasMetamask()) {
          throw new Error(t('error.no-metamask'));
        }

        const hasWeb3Service = selectHasWeb3Service(state);

        if (!hasWeb3Service) {
          await dispatch(
            createWeb3Service.initiate({ params: { walletId } }),
          ).unwrap();

          // We can safely assert non-undefined type since web3 service has been
          // just created
          const web3Service = MultiService.getWeb3Service()!;

          const { currentAccount } = web3Service.getKeyWriteProvider();

          // Since during creating web3 service an address was selected and
          // permissions were given, no need to call connectAccount fn
          return { data: currentAccount || null };
        }

        const connectedAccount = await connectAccount();

        return { data: connectedAccount || null };
      }),
    }),
  }),
  overrideExisting: true,
});
