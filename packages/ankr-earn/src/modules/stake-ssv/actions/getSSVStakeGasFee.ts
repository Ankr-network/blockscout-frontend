import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { store } from 'store';

import { EthereumSSV, Web3KeyReadProvider } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { CacheTags, ZERO } from 'modules/common/const';

import { SSV_PROVIDER_ID } from '../const';

interface IGetStakeGasFeeProps {
  amount: BigNumber;
}

export const { useLazyGetSSVStakeGasFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSSVStakeGasFee: build.query<BigNumber, IGetStakeGasFeeProps>({
      queryFn: queryFnNotifyWrapper<IGetStakeGasFeeProps, never, BigNumber>(
        async ({ amount }) => {
          const providerManager = getProviderManager();

          const { address, walletId } = selectEthProviderData(store.getState());

          if (!address || !walletId) {
            return { data: ZERO };
          }

          const provider = await providerManager.getProvider(
            SSV_PROVIDER_ID,
            walletId,
          );

          if (!(provider instanceof Web3KeyReadProvider)) {
            return { data: ZERO };
          }

          return {
            data: await EthereumSSV.getStakeGasFee({
              address,
              amount,
              provider,
            }),
          };
        },
        error =>
          getExtendedErrorText(error, t('stake-ssv.errors.stake-gas-fee')),
      ),
      providesTags: [CacheTags.account],
    }),
  }),
});
