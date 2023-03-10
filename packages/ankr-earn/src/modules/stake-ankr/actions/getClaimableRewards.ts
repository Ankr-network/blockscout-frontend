import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetClaimableAmountDataProps {
  validator: string;
}

export const { useGetClaimableRewardsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getClaimableRewards: build.query<BigNumber, IGetClaimableAmountDataProps>({
      queryFn: queryFnNotifyWrapper<
        IGetClaimableAmountDataProps,
        never,
        BigNumber
      >(
        async ({ validator }) => {
          const sdk = await AnkrStakingSDK.getInstance();

          const data = await sdk.getClaimableAmount(validator);

          return { data };
        },
        error =>
          getExtendedErrorText(error, t('stake-ankr.errors.claimable-rewards')),
      ),
    }),
  }),
});
