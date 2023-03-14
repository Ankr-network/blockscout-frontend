import { t } from '@ankr.com/common';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
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
        error =>
          getExtendedErrorText(
            error,
            t('stake-ankr.errors.all-claimable-unstakes'),
          ),
      ),
    }),
  }),
});
