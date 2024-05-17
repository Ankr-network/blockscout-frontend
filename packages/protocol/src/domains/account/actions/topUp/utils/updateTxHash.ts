import { AppDispatch, GetState } from 'store';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { setTopUpTransaction } from 'domains/account/store/accountTopUpSlice';

export interface IUpdateTxHashParams {
  dispatch: AppDispatch;
  getState: () => unknown;
  txHash: string | undefined;
}

export const updateTxHash = ({
  dispatch,
  getState,
  txHash: topUpTransactionHash,
}: IUpdateTxHashParams) => {
  const address = getCurrentTransactionAddress(getState as GetState);

  if (topUpTransactionHash) {
    dispatch(setTopUpTransaction({ address, topUpTransactionHash }));
  }
};
