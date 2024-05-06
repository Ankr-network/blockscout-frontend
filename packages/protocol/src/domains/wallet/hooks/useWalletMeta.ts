import { useAppSelector } from 'store/useAppSelector';

import { selectWalletMeta } from '../store/selectors';

export const useWalletMeta = () => {
  const walletMeta = useAppSelector(selectWalletMeta);

  return { walletMeta };
};
