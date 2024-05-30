import { AppDispatch, RootState } from 'store';
import { TQueryFulfilled } from 'store/queries/types';

import { getFeeDetails } from './getFeeDetails';
import { selectCryptoTxById } from '../store/selectors';
import { selectNativeTokenPrice } from '../actions/fetchNativeTokenPrice';
import { setDepositFeeDetailsEstimated } from '../store/paymentsSlice';

export interface IHandleEstimateDepositFeeQueryParams {
  dispatch: AppDispatch;
  getState: () => unknown;
  queryFulfilled: TQueryFulfilled<number>;
  txId: string;
}

export const handleEstimateDepositFeeQuery = async ({
  dispatch,
  getState,
  queryFulfilled,
  txId,
}: IHandleEstimateDepositFeeQueryParams) => {
  const { data: fee } = await queryFulfilled;

  const state = getState() as RootState;
  const tx = selectCryptoTxById(state, txId);

  if (tx) {
    const { network } = tx;
    const price = selectNativeTokenPrice(state, { network });

    const depositFeeDetailsEstimated = getFeeDetails({ fee, price });

    dispatch(
      setDepositFeeDetailsEstimated({ depositFeeDetailsEstimated, id: txId }),
    );
  }
};
