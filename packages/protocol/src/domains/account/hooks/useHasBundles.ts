import { selectHasBundles, selectMyBundlesIsLoaded } from '../store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export const useHasBundles = () => {
  const hasBundles = useAppSelector(selectHasBundles);
  const isLoaded = useAppSelector(selectMyBundlesIsLoaded);

  return { hasBundles, isLoaded };
};
