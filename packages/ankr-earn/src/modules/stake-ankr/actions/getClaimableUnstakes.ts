import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

interface IGetClaimableUnstakesProps {
  validator: string;
}

export const { useGetClaimableUnstakesQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getClaimableUnstakes: build.query<BigNumber, IGetClaimableUnstakesProps>({
      queryFn: queryFnNotifyWrapper<
        IGetClaimableUnstakesProps,
        never,
        BigNumber
      >(async ({ validator }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        const data = await sdk.getClaimableUnstakes(validator);

        return { data };
      }, getOnErrorWithCustomText(t('stake-ankr.errors.claimable-unstakes'))),
    }),
  }),
});
