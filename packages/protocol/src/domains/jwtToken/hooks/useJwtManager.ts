import { useAppSelector } from 'store/useAppSelector';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

import {
  selectAllowedJwtsCount,
  selectAllowedJwtsCountState,
  selectHasJwtManagerAccess,
} from '../store/selectors';

export const useJwtManager = () => {
  const hasAccess = useAppSelector(selectHasJwtManagerAccess);
  const { isLoading: loading, isUninitialized } = useAppSelector(
    selectAllowedJwtsCountState,
  );
  const allowedJwtsCount = useAppSelector(selectAllowedJwtsCount);

  const hasGroupAccessToReadJwtManager = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerRead,
  });

  const hasGroupAccessToWriteJwtManager = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerWrite,
  });

  const isInitialized = !isUninitialized;

  return {
    allowedJwtsCount,
    hasReadAccess: hasAccess && hasGroupAccessToReadJwtManager,
    hasWriteAccess: hasAccess && hasGroupAccessToWriteJwtManager,
    isInitialized,
    loading,
  };
};
