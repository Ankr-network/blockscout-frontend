import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { Spinner } from 'ui';
import { createRouteConfig } from '../../modules/router/utils/createRouteConfig';
import packageJson from '../../../package.json';

const PATH_ACADEMY = packageJson.homepage;

export const AcademyRoutesConfig = createRouteConfig(
  {
    academy: {
      path: PATH_ACADEMY,
      generatePath: () => PATH_ACADEMY,
    },
  },
  PATH_ACADEMY,
);

const LoadableAcademyContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/Introduction').then(module => module.Introduction),
  {
    fallback: <Spinner />,
  },
);

export function AcademyRoutes() {
  return (
    <>
      <Route
        exact
        path={AcademyRoutesConfig.academy.path}
        component={LoadableAcademyContainer}
      />
    </>
  );
}
