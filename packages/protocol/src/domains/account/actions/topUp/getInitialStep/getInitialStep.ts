import { IApiUserGroupParams, formatToWei, formatFromWei } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { GetState, RootState } from 'store';
import {
  makeNotification,
  shouldNotify,
} from 'store/utils/createNotifyingQueryFn';
import {
  selectAccount,
  setAllowanceTransaction,
} from 'domains/account/store/accountTopUpSlice';
import { web3Api } from 'store/queries';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { MultiService } from 'modules/api/MultiService';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

import { topUpResetTransactionSliceAndRedirect } from '../resetTransactionSliceAndRedirect';
import { topUpCheckAllowanceTransaction } from '../checkAllowanceTransaction';
import { topUpWaitTransactionConfirming } from '../waitTransactionConfirming';
import { checkFirstTopUpStep } from './checkFirstTopUpStep';
import { TopUpStep } from '../const';

const ONE_ANKR_TOKEN = new BigNumber(1);
// 1 check the first top up
// 2 has deposit transaction - wait transaction

// 3 has allowance
// 3a allowance is less than 1 ankr from previous deposit - ignore this allowance, show 0 step
// 3b allowance is less than depositValue  - redirect
// 3c has deposit amount - deposit
// 3d no deposit amount - redirect

// 4 no allowance
// 4a - has deposit amount - first step
// 4b - no deposit amount - redirect

export const {
  endpoints: { topUpGetInitialStep },
  useLazyTopUpGetInitialStepQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpGetInitialStep: build.query<TopUpStep | null, IApiUserGroupParams>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ group }, { getState, dispatch }) => {
          const address = await getCurrentTransactionAddress(
            getState as GetState,
          );

          const stepForTheFirstTopUp = await checkFirstTopUpStep({
            address,
            getState: getState as GetState,
            dispatch,
            group,
          });

          if (stepForTheFirstTopUp) return { data: stepForTheFirstTopUp };

          // deposit transaction
          const transaction = selectAccount(getState() as RootState, address);

          if (transaction?.topUpTransactionHash) {
            dispatch(topUpWaitTransactionConfirming.initiate({ group }));

            return { data: TopUpStep.waitTransactionConfirming };
          }

          // allowance
          if (transaction?.allowanceTransactionHash) {
            await dispatch(
              topUpCheckAllowanceTransaction.initiate(
                transaction?.allowanceTransactionHash,
              ),
            );

            dispatch(setAllowanceTransaction({ address }));
          }

          const service = await MultiService.getWeb3Service();

          const depositValue = transaction?.amount;
          const hasDepositValue = depositValue && !depositValue.isZero();

          const allowanceValue = await service
            .getContractService()
            .getAllowanceValue();
          const hasAllowance = allowanceValue && !allowanceValue.isZero();

          if (hasAllowance) {
            if (hasDepositValue) {
              if (allowanceValue.isLessThan(formatToWei(ONE_ANKR_TOKEN))) {
                return { data: TopUpStep.start };
              }

              if (allowanceValue.isLessThan(formatToWei(depositValue))) {
                dispatch(topUpResetTransactionSliceAndRedirect.initiate());

                throw new Error(
                  t('top-up-steps.errors.allowance-is-less-than-deposit', {
                    allowance: formatFromWei(allowanceValue),
                  }),
                );
              }

              return { data: TopUpStep.deposit };
            }

            dispatch(topUpResetTransactionSliceAndRedirect.initiate());

            throw new Error(t('top-up-steps.errors.enter-deposit-value'));
          }

          if (hasDepositValue) {
            return { data: TopUpStep.start };
          }

          dispatch(topUpResetTransactionSliceAndRedirect.initiate());

          throw new Error(t('top-up-steps.errors.enter-deposit-value'));
        },
        errorHandler: (error: unknown, _params, { dispatch }) => {
          if (shouldNotify(error)) {
            makeNotification(error, dispatch, { autoHideDuration: null });
          }

          return { error };
        },
      }),
    }),
  }),
});
