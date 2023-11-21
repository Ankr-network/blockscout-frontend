import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route, Switch } from 'react-router-dom';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { GuardAuthRoute } from 'domains/auth/components/GuardAuthRoute';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useJwtManager } from 'domains/jwtToken/hooks/useJwtManager';
import { useRedirectForSmallDevices } from 'hooks/useRedirectForSmallDevices';

import { GuardProjectRoute } from '../components/GuardProjectRoute';
import { ProjectsRoutesConfig } from './routesConfig';

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

  const { hasReadAccess, loading } = useJwtManager();
  const { isFreePremium, isLoggedIn } = useAuth();

  const { projectId } = useParams();

  if (loading) {
    return <OverlaySpinner />;
  }

  return (
    <GuardUserGroup
      blockName={BlockWithPermission.UsageData}
      shouldForceRedirect={isLoggedIn && !isFreePremium && !hasReadAccess}
      shouldRedirect
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

            return hasReadAccess && !isFreePremium ? (
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
  );
}
