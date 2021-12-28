import { Route } from 'react-router-dom';
import { createRouteConfig } from '../../modules/router/utils/createRouteConfig';
import loadable, { LoadableComponent } from '@loadable/component';
import { Spinner } from 'ui';

const PATH_LIBRARY = '/library';

export const LibraryRoutesConfig = createRouteConfig(
  {
    library: {
      path: PATH_LIBRARY,
      generatePath: () => PATH_LIBRARY,
    },
  },
  PATH_LIBRARY,
);

const LoadableLessonContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Lesson').then(module => module.Lesson),
  { fallback: <Spinner /> },
);

export function LibraryRoutes() {
  return (
    <>
      <Route
        exact
        path={LibraryRoutesConfig.library.path}
        component={LoadableLessonContainer}
      />
    </>
  );
}
