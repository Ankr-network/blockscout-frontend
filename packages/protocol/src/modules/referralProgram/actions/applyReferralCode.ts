import {
  IApplyReferralCodeParams,
  IApplyReferralCodeResult,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { web3Api } from 'store/queries';

import { ApplyReferralCodeErrorCode } from '../const';
import { handleApplyReferralCodeAccountingError } from './utils/handleApplyReferralCodeAccoutingError';
import { handleApplyReferralCodeCustomError } from './utils/handleApplyReferralCodeCustomError';

export const {
  endpoints: { applyReferralCode },
  useApplyReferralCodeMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    applyReferralCode: build.mutation<
      IApplyReferralCodeResult,
      IApplyReferralCodeParams
    >({
      queryFn: createNotifyingQueryFn(
        createQueryFnWithErrorHandler({
          queryFn: async params => {
            const api = MultiService.getService().getAccountingGateway();

            const data = await api.applyReferralCode(params);
            const isPromo = Boolean(data.name);
            const hasBonus = Boolean(data.custom_bonus);

            const isReferralCodeExpired = isPromo && !hasBonus;

            if (isReferralCodeExpired) {
              return { error: new Error(ApplyReferralCodeErrorCode.EXPIRED) };
            }

            return { data };
          },
          errorHandler: handleApplyReferralCodeAccountingError,
        }),
      ),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (exception) {
          handleApplyReferralCodeCustomError({ dispatch, exception });
        }
      },
    }),
  }),
  overrideExisting: true,
});
