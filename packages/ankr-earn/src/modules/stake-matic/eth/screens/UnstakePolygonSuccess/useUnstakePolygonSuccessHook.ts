import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { useAddMaticOnEthTokenToWalletMutation } from 'modules/stake-matic/eth/actions/useAddMaticOnEthTokenToWalletMutation';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/useGetMaticOnEthStatsQuery';
import {
  useGetMaticOnEthTxDataQuery,
  useGetMaticOnEthTxReceiptQuery,
} from 'modules/stake-matic/eth/actions/useGetMaticOnEthTxDataQuery';
import { useAppDispatch } from 'store/useAppDispatch';

import { POLLING_INTERVAL } from '../../const';

export interface IUnstakePolygonSuccessHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  destination?: string;
  transactionId?: string;
  tokenName: string;
  handleAddTokenToWallet: () => void;
}

interface IUnstakeSuccessParams {
  token: TMaticSyntToken;
  txHash: string;
}

export const useUnstakePolygonSuccessHook = (): IUnstakePolygonSuccessHook => {
  const { txHash, token } = useParams<IUnstakeSuccessParams>();
  const [addMATICTokenToWallet] = useAddMaticOnEthTokenToWalletMutation();
  const { isFetching: isLoading, data } = useGetMaticOnEthTxDataQuery({
    txHash,
  });
  const { data: receipt } = useGetMaticOnEthTxReceiptQuery(
    { txHash },
    {
      pollingInterval: POLLING_INTERVAL,
    },
  );
  const { data: stats, refetch: refetchStats } = useGetMaticOnEthStatsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    },
  );
  const dispatch = useAppDispatch();

  useProviderEffect(() => {
    if (!stats) {
      refetchStats();
    }
  }, [dispatch, txHash]);

  const onAddTokenClick = () => {
    addMATICTokenToWallet(token);
  };

  const amount = data?.amount ?? ZERO;

  const isPending = !receipt && !!data?.isPending;

  return {
    amount,
    destination: data?.destinationAddress,
    transactionId: txHash,
    tokenName: token,
    isLoading,
    isPending,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
