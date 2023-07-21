import { format } from 'date-fns';
import { useCallback } from 'react';
import { t } from '@ankr.com/common';

import { downloadCsv } from 'modules/common/utils/downloadCsv';
import { useLazyAccountFetchDailyChargingQuery } from 'domains/account/actions/fetchDailyCharging';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { TransactionsDownloader } from '../types';
import { getDailyChargingRequest } from '../utils/getDailyChargingRequest';

export const useTransactionsDownloader = (): TransactionsDownloader => {
  const [fetchDailyCharging] = useLazyAccountFetchDailyChargingQuery();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  return useCallback(
    async (timestamp: string) => {
      const query = getDailyChargingRequest(timestamp);

      const { data: csv } = await fetchDailyCharging({ ...query, group });

      if (csv) {
        const date = new Date(Number(timestamp));
        const title = t('account.payment-table.csv-title', {
          month: format(date, 'LLLL'),
          day: format(date, 'dd'),
          year: format(date, 'yyyy'),
        });

        downloadCsv(csv, title);
      }
    },
    [fetchDailyCharging, group],
  );
};
