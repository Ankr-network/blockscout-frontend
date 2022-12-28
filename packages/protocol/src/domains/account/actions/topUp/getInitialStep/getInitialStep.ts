import { GetState, RootState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from '../const';
import { areHashesEmpty } from './initialStepChecksUtils';
import { authConnect, AuthConnectParams } from 'domains/auth/actions/connect';
import { checkAllowanceStep } from './checkAllowanceStep';
import { checkFirstTopUpStep } from './checkFirstTopUpStep';
import { checkTopUpStep } from './checkTopUpStep';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { selectAccount } from 'domains/account/store/accountTopUpSlice';
import { topUpWaitTransactionConfirming } from '../waitTransactionConfirming';
import { web3Api } from 'store/queries';

export const {
  endpoints: { topUpGetInitialStep },
  useLazyTopUpGetInitialStepQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpGetInitialStep: build.query<TopUpStep, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState, dispatch }) => {
        const service = await MultiService.getWeb3Service();
        const provider = service.getKeyProvider();
        const { currentAccount: address } = provider;

        const stepForTheFirstTopUp = await checkFirstTopUpStep(
          address,
          getState as GetState,
          dispatch,
        );

        if (stepForTheFirstTopUp) return { data: stepForTheFirstTopUp };

        const transaction = selectAccount(getState() as RootState, address);

        if (areHashesEmpty(transaction)) return { data: TopUpStep.start };

        const allowanceStep = await checkAllowanceStep(
          dispatch,
          transaction?.rejectAllowanceTransactionHash,
          transaction?.allowanceTransactionHash,
        );

        if (allowanceStep) return { data: allowanceStep };

        const topUpStep = await checkTopUpStep(
          dispatch,
          transaction?.topUpTransactionHash,
        );

        if (topUpStep) return { data: topUpStep };

        const { data: connectData } = authConnect.select(
          undefined as unknown as AuthConnectParams,
        )(getState() as RootState);

        if (connectData?.credentials) {
          dispatch(topUpWaitTransactionConfirming.initiate());

          return { data: TopUpStep.waitTransactionConfirming };
        }

        return { data: TopUpStep.login };
      }),
    }),
  }),
});
