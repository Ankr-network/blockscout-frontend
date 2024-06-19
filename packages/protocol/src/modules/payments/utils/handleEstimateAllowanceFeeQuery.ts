import { AppDispatch, RootState } from 'store';
import { TQueryFulfilled } from 'store/queries/types';

import { getFeeDetails } from './getFeeDetails';
import { processLowFeeDetails } from './processLowFeeDetails';
import { selectCryptoTxById } from '../store/selectors';
import { selectNativeTokenPrice } from '../actions/fetchNativeTokenPrice';
import { setAllowanceFeeDetailsEstimated } from '../store/paymentsSlice';

export interface IHandleEstimateAllowanceFeeQueryParams {
  dispatch: AppDispatch;
  getState: () => unknown;
  queryFulfilled: TQueryFulfilled<number>;
  txId: string;
}

export const handleEstimateAllowanceFeeQuery = async ({
  dispatch,
  getState,
  queryFulfilled,
  txId,
}: IHandleEstimateAllowanceFeeQueryParams) => {
  const { data: fee } = await queryFulfilled;

  const state = getState() as RootState;
  const tx = selectCryptoTxById(state, txId);

  if (tx) {
    const { network } = tx;

    const price = selectNativeTokenPrice(state, { network });

    const allowanceFeeDetailsEstimated = processLowFeeDetails({
      feeDetails: getFeeDetails({ fee, price }),
    });

    dispatch(
      setAllowanceFeeDetailsEstimated({
        allowanceFeeDetailsEstimated,
        id: txId,
      }),
    );
  }
};
