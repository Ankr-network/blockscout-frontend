import { useAppSelector } from 'store/useAppSelector';

import { selectHasWeb3Service } from '../store';

export const useHasWeb3Service = () => {
  const hasWeb3Service = useAppSelector(selectHasWeb3Service);

  return { hasWeb3Service };
};
