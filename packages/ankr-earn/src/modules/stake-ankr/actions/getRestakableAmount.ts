import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetRestakableAmountDataProps {
  validator: string;
}

export const { useGetRestakableAmountQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getRestakableAmount: build.query<BigNumber, IGetRestakableAmountDataProps>({
      queryFn: queryFnNotifyWrapper<
        IGetRestakableAmountDataProps,
        never,
        BigNumber
      >(
        async ({ validator }) => {
          const sdk = await AnkrStakingSDK.getInstance();

          return { data: await sdk.getRestakableAmount(validator) };
        },
        error =>
          getExtendedErrorText(error, t('stake-ankr.errors.restakable-amount')),
      ),
    }),
  }),
});
