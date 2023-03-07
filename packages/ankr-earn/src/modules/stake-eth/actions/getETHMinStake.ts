import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { getEthereumSDK } from '../utils/getEthereumSDK';

export const { useGetETHMinStakeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getETHMinStake: build.query<BigNumber, void>({
      queryFn: queryFnNotifyWrapper<void, never, BigNumber>(
        async () => {
          const sdk = await getEthereumSDK();

          return { data: await sdk.getMinimumStake() };
        },
        error =>
          getExtendedErrorText(error, t('stake-ethereum.errors.min-stake')),
      ),
    }),
  }),
});
