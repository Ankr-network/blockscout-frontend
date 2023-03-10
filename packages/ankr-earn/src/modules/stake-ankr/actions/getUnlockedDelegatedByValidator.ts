import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetUndelegatedAmountDataProps {
  validator: string;
}

export const { useGetUnlockedDelegatedByValidatorQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      getUnlockedDelegatedByValidator: build.query<
        BigNumber,
        IGetUndelegatedAmountDataProps
      >({
        queryFn: queryFnNotifyWrapper<
          IGetUndelegatedAmountDataProps,
          never,
          BigNumber
        >(
          async ({ validator }) => {
            const sdk = await AnkrStakingSDK.getInstance();

            return {
              data: await sdk.getUnlockedDelegatedByValidator(validator),
            };
          },
          error =>
            getExtendedErrorText(
              error,
              t('stake-ankr.errors.unlocked-delegated-by-validator'),
            ),
        ),
      }),
    }),
  });
