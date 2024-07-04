import { GroupUserRole } from 'multirpc-sdk';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { ESettingsContentType } from 'domains/userSettings/types';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { getPermissions } from 'modules/groups/utils/getPermissions';

export interface IGetLocationToRedirectAfterConnectParams {
  canContinueTeamCreationFlow?: boolean;
  selectedGroupRole?: GroupUserRole;
}

export const getLocationToRedirectAfterConnect = ({
  canContinueTeamCreationFlow,
  selectedGroupRole,
}: IGetLocationToRedirectAfterConnectParams) => {
  const permissions = getPermissions(selectedGroupRole);

  const hasAccessToProjects = permissions.includes(
    BlockWithPermission.JwtManagerRead,
  );

  if (canContinueTeamCreationFlow) {
    const teamsPath = UserSettingsRoutesConfig.settings.generatePath(
      ESettingsContentType.Teams,
    );

    return teamsPath;
  }

  if (hasAccessToProjects) {
    const { search } = window.location;

    const projectsPath = ProjectsRoutesConfig.projects.generatePath({ search });

    return projectsPath;
  }

  const isFinance = selectedGroupRole === GroupUserRole.finance;

  if (isFinance) {
    const billingPath = AccountRoutesConfig.accountDetails.generatePath();

    return billingPath;
  }

  return ChainsRoutesConfig.chains.generatePath({ isLoggedIn: true });
};
