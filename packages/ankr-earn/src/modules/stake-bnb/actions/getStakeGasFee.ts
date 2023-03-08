import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { TBnbSyntToken } from '../types';
import { getBinanceSDK } from '../utils/getBinanceSDK';

interface IGetStakeGasFeeArgs {
  amount: BigNumber;
  token: TBnbSyntToken;
}

export const { useLazyGetBNBStakeGasFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getBNBStakeGasFee: build.query<BigNumber, IGetStakeGasFeeArgs>({
      queryFn: queryFnNotifyWrapper<IGetStakeGasFeeArgs, never, BigNumber>(
        async ({ amount, token }) => {
          const sdk = await getBinanceSDK();

          return { data: await sdk.getStakeGasFee(amount, token) };
        },
        error =>
          getExtendedErrorText(error, t('stake-bnb.errors.stake-gas-fee')),
      ),
    }),
  }),
});
