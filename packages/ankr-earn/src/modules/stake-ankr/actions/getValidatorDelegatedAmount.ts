import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetDelegatedAmountDataProps {
  validator: string;
}

export const { useGetValidatorDelegatedAmountQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getValidatorDelegatedAmount: build.query<
      BigNumber,
      IGetDelegatedAmountDataProps
    >({
      queryFn: queryFnNotifyWrapper<
        IGetDelegatedAmountDataProps,
        never,
        BigNumber
      >(
        async ({ validator }) => {
          const sdk = await AnkrStakingSDK.getInstance();

          return {
            data: await sdk.getDelegatedAmountByProvider(validator),
          };
        },
        error =>
          getExtendedErrorText(
            error,
            t('stake-ankr.errors.validator-delegated-amount'),
          ),
      ),
    }),
  }),
});
