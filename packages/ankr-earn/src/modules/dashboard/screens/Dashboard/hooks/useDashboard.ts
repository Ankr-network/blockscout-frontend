import { useDispatchRequest } from '@redux-requests/react';
import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { getEth2SwapData } from 'modules/eth2Swap/actions/getEth2SwapData';
import { fetchStats as fetchBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { fetchTxHistory as fetchBNBTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { getCommonData as fetchFTMStats } from 'modules/stake-fantom/actions/getCommonData';
import { fetchAPY as fetchPolygonAPY } from 'modules/stake-polygon/actions/fetchAPY';
import { fetchStats as fetchPolygonStats } from 'modules/stake-polygon/actions/fetchStats';
import { fetchTxHistory as fetchPolygonTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import {
  AvailableWriteProviders,
  BlockchainNetworkId,
} from 'provider/providerManager/types';

export const useDashboard = () => {
  const { chainId } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const dispatchRequest = useDispatchRequest();

  useProviderEffect(() => {
    switch (chainId) {
      case BlockchainNetworkId.goerli:
      case BlockchainNetworkId.mainnet:
        dispatchRequest(fetchPolygonStats());
        dispatchRequest(fetchPolygonTxHistory());
        dispatchRequest(fetchPolygonAPY());
        dispatchRequest(
          getEth2SwapData({
            providerId: AvailableWriteProviders.ethCompatible,
          }),
        );
        break;

      case BlockchainNetworkId.smartchain:
      case BlockchainNetworkId.smartchainTestnet:
        dispatchRequest(fetchBNBStats());
        dispatchRequest(fetchBNBTxHistory());
        break;

      case BlockchainNetworkId.fantom:
      case BlockchainNetworkId.fantomTestnet:
        dispatchRequest(fetchFTMStats());
        break;

      default:
        break;
    }
  }, [dispatchRequest]);
};
