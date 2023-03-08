import { t } from '@ankr.com/common';

import { TPolkadotAddress } from 'polkadot';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { PolkadotStakeSDK } from 'modules/stake-polkadot/api/PolkadotStakeSDK';
import { CacheTags } from 'modules/stake-polkadot/const';

export const { useChangePolkadotWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    changePolkadotWallet: build.mutation<TPolkadotAddress, TPolkadotAddress>({
      queryFn: queryFnNotifyWrapper<TPolkadotAddress, never, TPolkadotAddress>(
        async address => {
          const sdk = await PolkadotStakeSDK.getInstance();
          sdk.changeWalletAddress(address);
          return { data: address };
        },
        error =>
          getExtendedErrorText(error, t('stake-polkadot.errors.wallet-switch')),
      ),
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
