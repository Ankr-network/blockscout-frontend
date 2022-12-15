import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { useAddMaticOnPolygonTokenToWalletMutation } from 'modules/stake-matic/polygon/actions/useAddMaticOnPolygonTokenToWalletMutation';
import { useGetMaticOnPolygonCommonDataQuery } from 'modules/stake-matic/polygon/actions/useGetMaticOnPolygonCommonDataQuery';
import {
  useGetMaticOnPolygonTxDataQuery,
  useGetMaticOnPolygonTxReceiptQuery,
} from 'modules/stake-matic/polygon/actions/useGetMaticOnPolygonTxDataQuery';
import { useAppDispatch } from 'store/useAppDispatch';

import { POLLING_INTERVAL } from '../../const';

export interface IUnstakeSSuccessHook {
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

export const useUnstakeSuccessHook = (): IUnstakeSSuccessHook => {
  const { txHash, token } = useParams<IUnstakeSuccessParams>();
  const [addMATICTokenToWallet] = useAddMaticOnPolygonTokenToWalletMutation();
  const { isFetching: isLoading, data } = useGetMaticOnPolygonTxDataQuery({
    txHash,
  });
  const { data: receipt } = useGetMaticOnPolygonTxReceiptQuery(
    { txHash },
    {
      pollingInterval: POLLING_INTERVAL,
    },
  );
  const { data: stats, refetch: getMATICPOLYGONCommonDataRefetch } =
    useGetMaticOnPolygonCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });
  const dispatch = useAppDispatch();

  useProviderEffect(() => {
    if (!stats) {
      getMATICPOLYGONCommonDataRefetch();
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
