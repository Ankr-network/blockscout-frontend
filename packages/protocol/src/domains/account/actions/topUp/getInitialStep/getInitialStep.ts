import { GetState, RootState } from 'store';
import { TopUpStep } from '../const';
import { areHashesEmpty } from './initialStepChecksUtils';
import { AuthConnectParams } from 'domains/auth/actions/connect';
import { checkAllowanceStep } from './checkAllowanceStep';
import { checkFirstTopUpStep } from './checkFirstTopUpStep';
import { checkTopUpStep } from './checkTopUpStep';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { selectAccount } from 'domains/account/store/accountTopUpSlice';
import { topUpWaitTransactionConfirming } from '../waitTransactionConfirming';
import { web3Api } from 'store/queries';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { IApiUserGroupParams } from 'multirpc-sdk';
import { authMakeAuthorization } from 'domains/auth/actions/connect/authMakeAuthorization';

export const {
  endpoints: { topUpGetInitialStep },
  useLazyTopUpGetInitialStepQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpGetInitialStep: build.query<TopUpStep, IApiUserGroupParams>({
      queryFn: createNotifyingQueryFn(
        async ({ group }, { getState, dispatch }) => {
          const address = await getCurrentTransactionAddress(
            getState as GetState,
          );

          const stepForTheFirstTopUp = await checkFirstTopUpStep(
            address,
            getState as GetState,
            dispatch,
            group,
          );

          if (stepForTheFirstTopUp) return { data: stepForTheFirstTopUp };

          const transaction = selectAccount(getState() as RootState, address);

          if (areHashesEmpty(transaction)) return { data: TopUpStep.start };

          const allowanceStep = await checkAllowanceStep(
            dispatch,
            getState as GetState,
            transaction?.rejectAllowanceTransactionHash,
            transaction?.allowanceTransactionHash,
          );

          if (allowanceStep) return { data: allowanceStep };

          const topUpStep = await checkTopUpStep(
            dispatch,
            transaction?.topUpTransactionHash,
            group,
          );

          if (topUpStep) return { data: topUpStep };

          const { data: connectData } = authMakeAuthorization.select(
            undefined as unknown as AuthConnectParams,
          )(getState() as RootState);

          if (
            connectData?.credentials ||
            connectData?.isInstantJwtParticipant
          ) {
            dispatch(topUpWaitTransactionConfirming.initiate({ group }));

            return { data: TopUpStep.waitTransactionConfirming };
          }

          return { data: TopUpStep.login };
        },
      ),
    }),
  }),
});
