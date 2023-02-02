import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
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
        >(async ({ validator }) => {
          const sdk = await AnkrStakingSDK.getInstance();
          const provider = await sdk.getProvider();

          return {
            data: await sdk.getUnlockedDelegatedByValidator(
              validator,
              await provider.getBlockNumber(),
            ),
          };
        }, getOnErrorWithCustomText(t('stake-ankr.errors.unlocked-delegated-by-validator'))),
      }),
    }),
  });
