import { format } from 'date-fns';
import { useCallback } from 'react';

import { TransactionsDownloader } from '../types';
import { downloadCsv } from 'modules/common/utils/downloadCsv';
import { useLazyAccountFetchDailyChargingQuery } from 'domains/account/actions/fetchDailyCharging';
import { getDailyChargingRequest } from '../utils/getDailyChargingRequest';
import { t } from 'modules/i18n/utils/intl';

export const useTransactionsDownloader = (): TransactionsDownloader => {
  const [fetchDailyCharging] = useLazyAccountFetchDailyChargingQuery();

  return useCallback(
    async (timestamp: string) => {
      const query = getDailyChargingRequest(timestamp);

      const { data: csv } = await fetchDailyCharging(query);

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
    [fetchDailyCharging],
  );
};
