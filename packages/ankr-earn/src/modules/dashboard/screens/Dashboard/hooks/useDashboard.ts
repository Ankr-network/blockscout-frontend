import { resetRequests } from '@redux-requests/core';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { getEth2SwapData } from 'modules/eth2Swap/actions/getEth2SwapData';
import { fetchAPY as fetchAVAXAPY } from 'modules/stake-avax/actions/fetchAPY';
import { fetchStats as fetchAVAXStats } from 'modules/stake-avax/actions/fetchStats';
import { fetchTxHistory as fetchAVAXTxHistory } from 'modules/stake-avax/actions/fetchTxHistory';
import { fetchAPY as fetchBNBAPY } from 'modules/stake-bnb/actions/fetchAPY';
import { fetchStats as fetchBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { fetchTxHistory as fetchBNBTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { getAPY as getAftmbAPY } from 'modules/stake-fantom/actions/getAPY';
import { getCommonData as getFTMStats } from 'modules/stake-fantom/actions/getCommonData';
import { getHistory as getFTMHistory } from 'modules/stake-fantom/actions/getHistory';
import { fetchAPY as fetchPolygonAPY } from 'modules/stake-polygon/actions/fetchAPY';
import { fetchStats as fetchPolygonStats } from 'modules/stake-polygon/actions/fetchStats';
import { fetchTxHistory as fetchPolygonTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { useAppDispatch } from 'store/useAppDispatch';

export const useDashboard = (): void => {
  const dispatch = useAppDispatch();

  useProviderEffect(() => {
    dispatch(
      resetRequests([
        fetchPolygonStats.toString(),
        fetchPolygonTxHistory.toString(),
        getEth2SwapData.toString(),
        fetchAVAXStats.toString(),
        fetchAVAXTxHistory.toString(),
        fetchBNBStats.toString(),
        fetchBNBTxHistory.toString(),
        getFTMStats.toString(),
        getFTMHistory.toString(),
      ]),
    );

    dispatch(fetchPolygonStats());
    dispatch(fetchPolygonAPY());

    dispatch(getEth2SwapData());

    dispatch(fetchAVAXAPY());
    dispatch(fetchAVAXStats());

    dispatch(fetchBNBAPY());
    dispatch(fetchBNBStats());

    dispatch(getFTMStats());
    dispatch(getAftmbAPY());
  }, [dispatch]);
};
