import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { JwtTokenManager } from './JwtTokenManager';

export const JwtTokenManagerWithGuardUserGroup = () => {
  return (
    <GuardUserGroup blockName={BlockWithPermission.UsageData}>
      <JwtTokenManager />
    </GuardUserGroup>
  );
};
