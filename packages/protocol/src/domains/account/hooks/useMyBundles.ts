import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

import {
  selectMyBundles,
  selectMyBundlesLoading,
  selectMyBundlesIsLoaded,
} from '../store/selectors';
import { useFetchMyBundlesQuery } from '../actions/bundles/fetchMyBundles';

const DEFAULT_PARAMS = {
  shouldFetch: false,
};

export const useMyBundles = ({ shouldFetch } = DEFAULT_PARAMS) => {
  const hasGroupAccess = useGuardUserGroup({
    blockName: BlockWithPermission.Billing,
  });

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useFetchMyBundlesQuery(shouldFetch && hasGroupAccess ? group : skipToken);

  const bundles = useAppSelector(selectMyBundles);
  const loading = useAppSelector(selectMyBundlesLoading);
  const hasBundles = bundles.length > 0;
  const isLoaded = useAppSelector(selectMyBundlesIsLoaded);

  return { bundles, loading, hasBundles, isLoaded };
};
