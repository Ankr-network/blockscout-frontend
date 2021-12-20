import { Route } from 'react-router-dom';
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

export function AcademyRoutes() {
  return (
    <>
      <Route
        exact
        path={AcademyRoutesConfig.academy.path}
        component={() => <>Academy main page</>}
      />
    </>
  );
}
