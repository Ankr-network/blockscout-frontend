import { TPolkadotAddress } from 'polkadot';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { PolkadotStakeSDK } from 'modules/stake-polkadot/api/PolkadotStakeSDK';
import { CacheTags } from 'modules/stake-polkadot/const';

// todo: STAKAN-2484 translations are not initialized at the moment, so we use a constant
const ERROR_TEXT = 'Failed to change Polkadot wallet';

export const { useChangePolkadotWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    changePolkadotWallet: build.mutation<TPolkadotAddress, TPolkadotAddress>({
      queryFn: queryFnNotifyWrapper<TPolkadotAddress, never, TPolkadotAddress>(
        async address => {
          const sdk = await PolkadotStakeSDK.getInstance();
          sdk.changeWalletAddress(address);
          return { data: address };
        },
        getOnErrorWithCustomText(ERROR_TEXT),
      ),
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
