import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route, Switch } from 'react-router-dom';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardAuthRoute } from 'domains/auth/components/GuardAuthRoute';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
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

const LoadableProjectsPlaceholderContainer: LoadableComponent<void> = loadable(
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

export function ProjectsRoutes() {
  useRedirectForSmallDevices();

  const { hasReadAccess, loading } = useJwtManager();
  const { isFreePremium, isLoggedIn } = useAuth();

  if (loading) {
    return <OverlaySpinner />;
  }

  const Component = hasReadAccess
    ? LoadableProjectsContainer
    : LoadableProjectsPlaceholderContainer;

  return (
    <GuardUserGroup
      blockName={BlockWithPermission.UsageData}
      shouldForceRedirect={isLoggedIn && !isFreePremium && !hasReadAccess}
      shouldRedirect
    >
      <Switch>
        <Route
          exact
          path={ProjectsRoutesConfig.projects.path}
          component={Component}
        />
        <GuardAuthRoute
          exact
          path={ProjectsRoutesConfig.newProject.path}
          render={() => (
            <GuardProjectRoute>
              <LoadableNewProjectContainer />
            </GuardProjectRoute>
          )}
        />
      </Switch>
    </GuardUserGroup>
  );
}
