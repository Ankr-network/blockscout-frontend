import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route, Switch } from 'react-router-dom';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardAuthRoute } from 'domains/auth/components/GuardAuthRoute';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { selectFetchGroupJwtLoading } from 'domains/userGroup/actions/fetchGroupJwt';
import { selectIsEnterpriseClientLoading } from 'domains/enterprise/actions/fetchIsEnterpriseClient';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useJWTManagerPermissions } from 'domains/jwtToken/hooks/useJWTManagerPermissions';
import { useRedirectForSmallDevices } from 'hooks/useRedirectForSmallDevices';
import { useRedirectToInviteLink } from 'hooks/useRedirectToInviteLink';
import { Placeholder } from 'modules/common/components/Placeholder';

import { ProjectsRoutesConfig } from './routesConfig';
import { GuardProjectRoute } from '../components/GuardProjectRoute';

const LoadableProjectsContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/Projects').then(module => module.ProjectsPage),
  {
    fallback: <OverlaySpinner />,
  },
);

const LoadableProjectsPlaceholderContainer: LoadableComponent<any> = loadable(
  async () =>
    import('../components/ProjectsPlaceholder').then(
      module => module.ProjectsPlaceholder,
    ),
  {
    fallback: <OverlaySpinner />,
  },
);

const LoadableNewProjectContainer: LoadableComponent<any> = loadable(
  async () =>
    import('../screens/NewProject').then(module => module.NewProjectPage),
  {
    fallback: <OverlaySpinner />,
  },
);

const LoadableProjectContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/Project').then(module => module.ProjectPage),
  {
    fallback: <OverlaySpinner />,
  },
);

const { useParams } = ProjectsRoutesConfig.project;

export function ProjectsRoutes() {
  useRedirectForSmallDevices();

  const {
    allowedJWTsCountLoading,
    hasReadAccess: hasJwtManagerReadAccess,
    isAllowedJWTsCountInitialized,
  } = useJWTManagerPermissions();

  const { isFreePremium, isLoggedIn, isPremiumStatusUninitialized, loading } =
    useAuth();

  const isLoadingIsEnterpriseClient = useAppSelector(
    selectIsEnterpriseClientLoading,
  );
  const isLoadingFetchGroupJwt = useAppSelector(selectFetchGroupJwtLoading);

  const isProjectsContainer =
    hasJwtManagerReadAccess ||
    isLoadingIsEnterpriseClient ||
    isLoadingFetchGroupJwt;

  const hasAccessToPremiumStatus = useGuardUserGroup({
    blockName: BlockWithPermission.AccountStatus,
  });

  const { projectId } = useParams();

  const shouldShowSpinner =
    allowedJWTsCountLoading ||
    loading ||
    (hasAccessToPremiumStatus && isPremiumStatusUninitialized && isLoggedIn);

  useRedirectToInviteLink({ shouldSkipRedirect: shouldShowSpinner });

  if (shouldShowSpinner) {
    return <OverlaySpinner />;
  }

  const shouldForceRedirect =
    isLoggedIn &&
    !isFreePremium &&
    isAllowedJWTsCountInitialized &&
    !hasJwtManagerReadAccess;

  return (
    <Placeholder hasPlaceholder={loading} placeholder={<OverlaySpinner />}>
      <GuardUserGroup
        blockName={BlockWithPermission.UsageData}
        shouldForceRedirect={shouldForceRedirect}
        shouldRedirect
        shouldHideAlert
      >
        <Switch>
          <Route
            exact
            path={[
              ProjectsRoutesConfig.projects.path,
              ProjectsRoutesConfig.project.path,
            ]}
            render={() => {
              if (projectId) {
                return (
                  <GuardAuthRoute>
                    <GuardProjectRoute>
                      <LoadableProjectContainer />
                    </GuardProjectRoute>
                  </GuardAuthRoute>
                );
              }

              return isProjectsContainer ? (
                <LoadableProjectsContainer />
              ) : (
                <LoadableProjectsPlaceholderContainer />
              );
            }}
          />
          <Route
            exact
            path={ProjectsRoutesConfig.newProject.path}
            render={() => (
              <GuardAuthRoute>
                <GuardProjectRoute>
                  <LoadableNewProjectContainer />
                </GuardProjectRoute>
              </GuardAuthRoute>
            )}
          />
        </Switch>
      </GuardUserGroup>
    </Placeholder>
  );
}
