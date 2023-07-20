import { skipToken } from '@reduxjs/toolkit/dist/query';

import { selectMyBundles, selectMyBundlesLoading } from '../store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useFetchMyBundlesQuery } from '../actions/bundles/fetchMyBundles';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

const DEFAULT_PARAMS = {
  shouldFetch: true,
};

export const useMyBundles = ({ shouldFetch } = DEFAULT_PARAMS) => {
  const hasGroupAccess = useGuardUserGroup({
    blockName: BlockWithPermission.Billing,
  });

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useFetchMyBundlesQuery(shouldFetch && hasGroupAccess ? group : skipToken);

  const bundles = useAppSelector(selectMyBundles);
  const loading = useAppSelector(selectMyBundlesLoading);

  return { bundles, loading };
};
