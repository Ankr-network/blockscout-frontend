import { t } from '@ankr.com/common';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { SwitcherSDK } from '../api/SwitcherSDK';
import {
  AvailableSwitcherToken,
  AvailableSwitchNetwork,
  SwitcherCacheTags,
} from '../const';

interface IAddTokenToWalletArgs {
  chainId: AvailableSwitchNetwork;
  swapOption: AvailableSwitcherToken;
}

export const { useAddSwitchTokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addSwitchTokenToWallet: build.mutation<boolean, IAddTokenToWalletArgs>({
      queryFn: queryFnNotifyWrapper<IAddTokenToWalletArgs, never, boolean>(
        async ({ chainId, swapOption }) => {
          const sdk = await SwitcherSDK.getInstance();
          return {
            data: await sdk.addTokenToWallet({ chainId, token: swapOption }),
          };
        },
        error =>
          getExtendedErrorText(error, t('switcher.errors.add-token-to-wallet')),
      ),
      invalidatesTags: [SwitcherCacheTags.common],
    }),
  }),
});
