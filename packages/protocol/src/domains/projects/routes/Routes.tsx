import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';

import { GuardProjectRoute } from '../components/GuardProjectRoute';
import { ProjectsRoutesConfig } from './routesConfig';
import { useRedirectForSmallDevices } from 'hooks/useRedirectForSmallDevices';

const LoadableProjectsContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/Projects').then(module => module.ProjectsPage),
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

  return (
    <GuardProjectRoute>
      <Route
        exact
        path={ProjectsRoutesConfig.projects.path}
        component={LoadableProjectsContainer}
      />
      <Route
        exact
        path={ProjectsRoutesConfig.newProject.path}
        component={LoadableNewProjectContainer}
      />
    </GuardProjectRoute>
  );
}
