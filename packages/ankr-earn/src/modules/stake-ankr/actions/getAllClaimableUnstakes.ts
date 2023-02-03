import { t } from '@ankr.com/common';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IClaimableUnstake } from '../api/AnkrStakingSDK/types';

export const { useLazyGetAllClaimableUnstakesQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getAllClaimableUnstakes: build.query<IClaimableUnstake[], void>({
      queryFn: queryFnNotifyWrapper<void, never, IClaimableUnstake[]>(
        async () => {
          const sdk = await AnkrStakingSDK.getInstance();
          const data = await sdk.getAllClaimableUnstakes();

          return { data };
        },
        getOnErrorWithCustomText(t('stake-ankr.errors.all-claimable-unstakes')),
      ),
    }),
  }),
});
