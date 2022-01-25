import { useQuery } from '@redux-requests/react';
import { fetchTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { ITxEventsHistoryData } from 'modules/stake-polygon/api/PolygonSDK';

interface IUseMaticStakingAsset {
  txHistory: ITxEventsHistoryData | null;
}

export const useMaticTxHistory = (): IUseMaticStakingAsset => {
  const { data } = useQuery({
    type: fetchTxHistory,
  });

  return {
    txHistory: data,
  };
};
