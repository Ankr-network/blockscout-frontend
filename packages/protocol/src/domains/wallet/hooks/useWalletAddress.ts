import { useAppSelector } from 'store/useAppSelector';

import { selectWalletAddress } from '../store/selectors';

export const useWalletAddress = () => {
  const walletAddress = useAppSelector(selectWalletAddress);

  return { walletAddress };
};
