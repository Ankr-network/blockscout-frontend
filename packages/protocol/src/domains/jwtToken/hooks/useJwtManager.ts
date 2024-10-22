import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useAppSelector } from 'store/useAppSelector';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { selectHasJwtManagerAccess } from '../store/selectors';
import { useAllowedJWTsCount } from './useAllowedJWTsCount';

export const useJwtManager = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const hasAccess = useAppSelector(state =>
    selectHasJwtManagerAccess(state, { group }),
  );
  const {
    allowedJWTsCount,
    allowedJWTsCountState: { isUninitialized },
    isLoading: loading,
  } = useAllowedJWTsCount({ skipFetching: true });

  const hasGroupAccessToReadJwtManager = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerRead,
  });

  const hasGroupAccessToWriteJwtManager = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerWrite,
  });

  const isInitialized = !isUninitialized;

  return {
    allowedJWTsCount,
    hasReadAccess: hasAccess && hasGroupAccessToReadJwtManager,
    hasWriteAccess: hasAccess && hasGroupAccessToWriteJwtManager,
    isInitialized,
    loading,
  };
};
