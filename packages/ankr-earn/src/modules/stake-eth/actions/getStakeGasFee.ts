import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { TEthToken } from '@ankr.com/staking-sdk';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { getEthereumSDK } from '../utils/getEthereumSDK';

interface IGetStakeGasFeeArgs {
  amount: BigNumber;
  token: TEthToken;
}

export const { useLazyGetETHStakeGasFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getETHStakeGasFee: build.query<BigNumber, IGetStakeGasFeeArgs>({
      queryFn: queryFnNotifyWrapper<IGetStakeGasFeeArgs, never, BigNumber>(
        async ({ amount, token }) => {
          const sdk = await getEthereumSDK();

          return { data: await sdk.getStakeGasFee(amount, token) };
        },
        error =>
          getExtendedErrorText(error, t('stake-ethereum.errors.stake-gas-fee')),
      ),
    }),
  }),
});
