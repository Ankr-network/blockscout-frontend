import { useAppSelector } from 'store/useAppSelector';

import { selectNetworkId } from '../store/selectors';

export const useWalletNetworkId = () => {
  const networkId = useAppSelector(selectNetworkId);

  return { networkId };
};
