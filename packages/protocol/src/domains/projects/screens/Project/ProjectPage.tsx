import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';

import { Project } from './components/Project';
import { GuardProject } from './components/GuardProject';

export const ProjectPage = () => {
  return (
    <GuardUserGroup
      shouldRedirect
      blockName={BlockWithPermission.JwtManagerRead}
    >
      <GuardProject>
        <Project />
      </GuardProject>
    </GuardUserGroup>
  );
};
