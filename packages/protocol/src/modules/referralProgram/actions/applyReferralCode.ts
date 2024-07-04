import { AccountingErrorCode, IApplyReferralCodeParams } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { isAxiosAccountingError } from 'store/utils/isAxiosAccountingError';
import { web3Api } from 'store/queries';

export const {
  endpoints: { applyReferralCode },
  useApplyReferralCodeMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    applyReferralCode: build.mutation<boolean, IApplyReferralCodeParams>({
      queryFn: createNotifyingQueryFn(async params => {
        const api = MultiService.getService().getAccountingGateway();

        try {
          await api.applyReferralCode(params);

          return { data: true };
        } catch (exception) {
          if (isAxiosAccountingError(exception)) {
            const error = exception.response?.data.error;

            // to change error message
            if (error?.code === AccountingErrorCode.NotFound) {
              throw new Error(t('error.wrong-refresh-code'));
            }

            // to change error message
            if (error?.code === AccountingErrorCode.AlreadyExists) {
              throw new Error(t('error.referral-code-already-used'));
            }
          }

          throw exception;
        }
      }),
    }),
  }),
  overrideExisting: true,
});
