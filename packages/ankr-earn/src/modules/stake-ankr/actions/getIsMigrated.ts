import { t } from '@ankr.com/common';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IGetIsMigratedDelegator } from '../api/AnkrStakingSDK/types';
import { CacheTags } from '../cacheTags';

type TGetIsMigratedArgs = string | undefined;

export const { useGetIsMigratedQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getIsMigrated: build.query<IGetIsMigratedDelegator, TGetIsMigratedArgs>({
      queryFn: queryFnNotifyWrapper<
        TGetIsMigratedArgs,
        never,
        IGetIsMigratedDelegator
      >(
        async address => {
          if (!address) {
            throw new Error(t('stake-ankr.errors.migrated-data-address'));
          }
          const sdk = await AnkrStakingSDK.getInstance();

          // todo: STAKAN-2571 remove try/catch after migration
          try {
            const data = await sdk.getIsMigratedDelegator(address);
            return { data };
          } catch (error) {
            return {
              data: {
                isMigrationNeeded: false,
              },
            };
          }
        },
        error =>
          getExtendedErrorText(error, t('stake-ankr.errors.migrated-data')),
      ),
      providesTags: [CacheTags.migration],
    }),
  }),
});
