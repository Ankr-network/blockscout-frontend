import { BlockWithPermission } from '../constants/groups';
import { usePermissionsAndRole } from './usePermissionsAndRole';

export interface GuardUserGroupParams {
  blockName: BlockWithPermission;
}

export const useGuardUserGroup = ({ blockName }: GuardUserGroupParams) => {
  const { permissions } = usePermissionsAndRole();

  if (!permissions || permissions.length === 0) {
    return true;
  }

  return permissions.includes(blockName);
};
