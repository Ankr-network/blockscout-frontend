import { sleep, t } from '@ankr.com/common';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { Milliseconds } from 'modules/common/types';
import { showNotification } from 'modules/notifications';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { CacheTags } from '../cacheTags';

type TMigrateDelegator = boolean;

const SYNCRONIZATION_DELAY: Milliseconds = 7000;

export const MIGRATE_DELEGATOR_KEY = 'migrateDelegator';

export const { useMigrateDelegatorMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    migrateDelegator: build.mutation<TMigrateDelegator, void>({
      invalidatesTags: [CacheTags.migration],
      queryFn: queryFnNotifyWrapper<void, never, TMigrateDelegator>(
        async () => {
          const sdk = await AnkrStakingSDK.getInstance();
          const { receiptPromise } = await sdk.migrateDelegator();

          // todo: use separate query to get status for more safety
          const { status } = await receiptPromise;

          // since we are using the AAPI there is a delay in the migration status update
          await sleep(SYNCRONIZATION_DELAY);

          return { data: status };
        },
        error => getExtendedErrorText(error, t('stake-ankr.errors.migrate')),
      ),
      onQueryStarted: (_args, { dispatch, queryFulfilled }) =>
        queryFulfilled.then(({ data }) => {
          if (data) {
            dispatch(
              showNotification({
                key: MIGRATE_DELEGATOR_KEY,
                message: t('stake-ankr.success.migrate'),
                variant: 'success',
              }),
            );
          }
        }),
    }),
  }),
});
