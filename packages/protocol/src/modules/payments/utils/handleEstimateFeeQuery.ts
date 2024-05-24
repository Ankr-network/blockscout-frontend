import { EBlockchain } from 'multirpc-sdk';

import { AppDispatch, RootState } from 'store';
import { TQueryFulfilled } from 'store/queries/types';

import { getFeeDetails } from './getFeeDetails';
import { selectNativeTokenPrice } from '../actions/fetchNativeTokenPrice';
import { setAllowanceFeeDetailsEstimated } from '../store/paymentsSlice';

export interface IHandleEstimateAllowanceFeeQueryParams {
  dispatch: AppDispatch;
  getState: () => unknown;
  network: EBlockchain;
  queryFulfilled: TQueryFulfilled<number>;
  txId: string;
}

export const handleEstimateAllowanceFeeQuery = async ({
  dispatch,
  getState,
  network,
  queryFulfilled,
  txId,
}: IHandleEstimateAllowanceFeeQueryParams) => {
  const { data: fee } = await queryFulfilled;

  const state = getState() as RootState;
  const price = selectNativeTokenPrice(state, { network });

  const allowanceFeeDetailsEstimated = getFeeDetails({ fee, price });

  dispatch(
    setAllowanceFeeDetailsEstimated({
      allowanceFeeDetailsEstimated,
      id: txId,
    }),
  );
};
