import { t } from '@ankr.com/common';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { TFtmSyntToken } from '../types/TFtmSyntToken';
import { getFantomSDK } from '../utils/getFantomSDK';

export const { useAddFTMTokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addFTMTokenToWallet: build.mutation<boolean, TFtmSyntToken>({
      queryFn: queryFnNotifyWrapper<TFtmSyntToken, never, boolean>(
        async token => {
          const sdk = await getFantomSDK();

          return { data: await sdk.addTokenToWallet(token) };
        },
        error =>
          getExtendedErrorText(error, t('stake-fantom.errors.add-to-wallet')),
      ),
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
