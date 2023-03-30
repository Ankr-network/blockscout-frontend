import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import { Web3KeyReadProvider, XDC } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { ONE, XDC_PROVIDER_BY_ENV } from 'modules/common/const';

const { getAnkrXDCRatio } = XDC;

export const { useGetXdcCertRatioQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getXdcCertRatio: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(
        async (_, { getState }) => {
          const providerManager = getProviderManager();

          const { address, walletId } = selectEthProviderData(
            getState() as RootState,
          );

          const defaultRatio = ONE;

          if (!address || !walletId) {
            return {
              data: defaultRatio,
            };
          }

          const provider = await providerManager.getETHReadProvider(
            XDC_PROVIDER_BY_ENV,
          );

          if (!(provider instanceof Web3KeyReadProvider)) {
            return {
              data: defaultRatio,
            };
          }

          const data = await getAnkrXDCRatio({
            provider,
          });

          return { data };
        },
        error =>
          // todo: use actual error text
          getExtendedErrorText(error, t('stake-avax.errors.common-data')),
      ),
    }),
  }),
});
