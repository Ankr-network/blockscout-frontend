import { selectMyBundles, selectMyBundlesLoading } from '../store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useFetchMyBundlesQuery } from '../actions/bundles/fetchMyBundles';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useMyBundles = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useFetchMyBundlesQuery(group);

  const bundles = useAppSelector(selectMyBundles);
  const loading = useAppSelector(selectMyBundlesLoading);

  return { bundles, loading };
};
