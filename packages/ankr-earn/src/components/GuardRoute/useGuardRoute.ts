import { useSelector } from 'react-redux';
import { IStoreState } from '../../store/reducers';
import { useNetworks } from './useNetworks';

export const useGuardRoute = (availableNetworks: number[]) => {
  const { isConnected: isAuth, chainId } = useSelector(
    (state: IStoreState) => state.user,
  );

  const networks = useNetworks();

  const filteredNetworks = networks.filter(network =>
    availableNetworks.includes(network.chainId),
  );

  const isUnsupportedNetwork =
    isAuth && chainId !== undefined && !availableNetworks.includes(chainId);

  return {
    isUnsupportedNetwork,
    filteredNetworks,
    chainId,
    isAuth,
  };
};
